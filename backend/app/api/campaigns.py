from flask import Blueprint, jsonify, make_response, request
from flask_login import login_required, current_user
from sqlalchemy.orm import subqueryload
# from werkzeug.datastructures import MultiDict

from app.models import Campaign, Category, Note, db
from app.forms import CampaignForm

campaigns = Blueprint('campaigns', __name__)


@campaigns.route('/<current_campaign_id>')
@login_required
def load_campaign(current_campaign_id):
  campaign = Campaign.query.get(current_campaign_id)

  if campaign.user_id == current_user.id:
    categories = Category.query.all()
    formatted_cats = [ cat.to_dict() for cat in categories ]
    # tags_by_cat = { category.id:category.tags for category in categories }

    tags_list = [ tag.to_dict() for tag in campaign.tags ]
    tags_by_cat = { cat.id: [] for cat in categories }
    for tag in tags_list:
      tags_by_cat[tag['category_id']].append(tag)

    # notes_list = Note.query.filter_by(campaign_id=current_campaign_id).order_by('created_at')
    # formatted_notes = { note.id:note.to_dict() for note in notes_list }

    res = make_response({ 'categories': formatted_cats, 'tags': tags_by_cat })
    return res
  else:
    return jsonify({ 'errors': ["could not load campaign data from database"]})


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
