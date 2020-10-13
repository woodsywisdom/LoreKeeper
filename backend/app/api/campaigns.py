from flask import Blueprint, jsonify, make_response, request
from flask_login import login_required, current_user
from sqlalchemy.orm import subqueryload
# from werkzeug.datastructures import MultiDict

from app.models import Campaign, Category, Note, Tag, db
from app.forms import CampaignForm

campaigns = Blueprint('campaigns', __name__)


@campaigns.route('/<current_campaign_id>')
@login_required
def load_campaign(current_campaign_id):
  campaign = Campaign.query.get(current_campaign_id)

  if campaign.user_id == current_user.id:
    categories = Category.query.all()
    formatted_cats = [ cat.to_dict() for cat in categories ]

    formatted_tags = { tag.name:tag.to_dict() for tag in campaign.tags }
    pinned_list = [ pin.tag.to_dict() for pin in campaign.pins]

    res = make_response({ 'categories': formatted_cats, 'tags': formatted_tags, 'pins': pinned_list })
    return res
  else:
    return jsonify({ 'errors': ["could not load campaign data from database"]})

@campaigns.route('/<current_campaign_id>/', methods=['POST', ])
@login_required
def add_note(current_campaign_id):
  data = request.json
  note_content = data['noteContent']
  new_hashtag_names = data['newHashtags']
  hashtag_ids = data['hashtagIds']
  # print(f'++++++++++request data: {data}')
  if not data:
    res = make_response({'errors': ['no request data']}, 400)
    return res
  if len(note_content) > 255:
    res = make_response({'errors': ['Note is longer than 255 characters']}, 400)
    return res

  new_note = Note(content=note_content)
  new_tags = []
  for tag_name in new_hashtag_names:
    new_tag = Tag(name=tag_name, campaign_id=current_campaign_id, category_id = 1)
    db.session.add(new_tag)
    new_note.tags.append(new_tag)
    new_tags.append(new_tag.to_dict())
  for tagId in hashtag_ids:
    tag = Tag.query.get(tagId)
    new_note.tags.append(tag)

  db.session.add(new_note)
  db.session.commit()
  res = make_response({
                        'message': 'new note successfully created',
                        'newNote': new_note.to_dict(),
                        'newTags': new_tags }, 200)
  return res






@campaigns.route('/', methods=['POST', ])
@login_required
def add_campaign():
  data = request.json
  # print(f'++++++++++request data: {data}')

  form = CampaignForm(mapping = data)

  if not data:
    return jsonify({'errors': 'no request data'})
  if form.validate():
    # print(f'+++++++++form validated')
    new_campaign = Campaign(title=data['title'],
                            description=data['description'],
                            user_id=current_user.id )
    db.session.add(new_campaign)
    db.session.commit()
    return jsonify(new_campaign.to_dict())
  else:
    # print(f'+++++++++form not validated')
    res = make_response({ "errors": [form.errors[error][0] for error in form.errors]}, 401)
    return jsonify(res)
