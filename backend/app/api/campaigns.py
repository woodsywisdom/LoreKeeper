from flask import Blueprint, jsonify, make_response, request
from flask_login import login_required, current_user
from sqlalchemy.orm import subqueryload
# from werkzeug.datastructures import MultiDict

from app.models import Campaign, Category, Note, Tag, Pin, db
from app.forms import CampaignForm

campaigns = Blueprint('campaigns', __name__)


@campaigns.route('/<current_campaign_id>')
@login_required
def load_campaign(current_campaign_id):
  campaign = Campaign.query.get(current_campaign_id)
  print(f'_____________campaign {current_campaign_id}: {campaign}')

  if campaign.user_id == current_user.id:
    categories = Category.query.all()
    formatted_cats = [ cat.to_dict() for cat in categories ]

    formatted_tags = { tag.name:tag.to_dict() for tag in campaign.tags }
    pinned_list = [ pin.tag.to_dict() for pin in campaign.pins]
    print(f'_____________tags: {formatted_tags}')
    print(f'_____________pins: {pinned_list}')


    res = make_response({ 'campaign': campaign.to_dict(),
                          'categories': formatted_cats,
                          'tags': formatted_tags,
                          'pins': pinned_list, })
    return res
  else:
    return make_response({ 'errors': ['You are not authorized to access this campaign', ]}, 400)

@campaigns.route('/<current_campaign_id>/', methods=['POST', ])
@login_required
def add_note(current_campaign_id):
  data = request.json
  note_content = data['noteContent']
  new_hashtag_names = data['newHashtags']
  hashtag_ids = data['hashtagIds']
  if not data:
    res = make_response({'errors': ['no request data']}, 400)
    return res
  if len(note_content) > 255:
    res = make_response({'errors': ['Note is longer than 255 characters']}, 400)
    return res

  new_note = Note(content=note_content)
  new_tags = []
  for tag_name in new_hashtag_names:
    new_tag = Tag(name=tag_name, campaign_id=current_campaign_id, category_id = 1, user_id=current_user.id)
    db.session.add(new_tag)
    new_note.tags.append(new_tag)
    db.session.flush()
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

# @campaigns.route('/<user_id>')
# @login_required
# def load_campaigns(user_id):
#   if current_user.get_id() == userId:
#     campaigns_list = Campaign.query.filter(Campaign.user_id == user_id).all()
#     formatted_campaigns = { campaign['id']: campaign.to_dict() for campaign in campaigns_list }
#     res = make_response({ 'campaigns': formatted_campaigns })
#     return res
#   else:
#     return make_response({ 'campaigns': {}, 'errors': ['You do not have access to this page']}, 401)

@campaigns.route('/', methods=['POST', ])
@login_required
def add_campaign():
  data = request.json
  # print(f'++++++++++request data: {data}')

  form = CampaignForm(mapping = data)
  print(f'*************data: {data}')
  print(f'*************form.data: {form.data}')
  if not data:
    return jsonify({'errors': ['no request data',]})
  if form.validate():
    # print(f'+++++++++form validated')
    new_campaign = Campaign(title=data['title'],
                            description=data['description'],
                            user_id=current_user.id )
    db.session.add(new_campaign)
    db.session.flush()
    print(f'_____________ new_campaign: {new_campaign.to_dict()}')
    first_session = Tag(name='#session-1',
                        campaign_id=new_campaign.id,
                        category_id=2,
                        user_id=current_user.id)
    new_campaign.tags.append(first_session)
    db.session.add(first_session)
    db.session.flush()
    print(f'_____________first_session: {first_session.to_dict()}')
    print(f'_____________ new_campaign: {new_campaign.to_dict()}')
    default_pin = Pin(campaign_id=new_campaign.id,
                      tag_id=first_session.id)
    new_campaign.pins.append(default_pin)
    db.session.add(default_pin)
    db.session.commit()
    return make_response({ 'campaign': new_campaign.to_dict() })
  else:
    print(f'+++++++++form not validated {form.errors}')
    res = make_response({ "errors": [form.errors[error][0] for error in form.errors]}, 400)
    return res

@campaigns.route('/<campaign_id>/', methods=['DELETE', ])
@login_required
def delete_campaign(campaign_id):
  campaign = Campaign.query.get(campaign_id)
  # print(f'!!!!!!!!!{current_user.get_id()}')
  # print(f'!!!!!!!!!{campaign.user_id}')
  # print(f'!!!!!!!!!{int(current_user.get_id()) == campaign.user_id}')
  if int(current_user.get_id()) == campaign.user_id:
    db.session.delete(campaign)
    db.session.commit()
    return make_response({ 'message': 'Campaign successfully deleted'})
  else:
    return make_response({ 'errors': ['You do not have permission to delete this campaign']}, 401)
