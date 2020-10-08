from flask import Blueprint, jsonify, make_response, request
from flask_login import login_required, current_user
from werkzeug.datastructures import MultiDict

from app.models import Campaign, db
from app.forms import CampaignForm

campaigns = Blueprint('campaigns', __name__)


@campaigns.route('/', methods=['POST', ])
@login_required
def add_ampaign():
  data = request.json
  print(f'++++++++++request data: {data}')

  form = CampaignForm(mapping = data)

  if not data:
    return jsonify({'errors': 'no request data'})
  if form.validate():
    print(f'+++++++++form validated')
    new_campaign = Campaign(title=data['title'], description=data['description'], user_id=current_user.id )
    db.session.add(new_campaign)
    db.session.commit()
    return jsonify(new_campaign.to_dict())
  else:
    print(f'+++++++++form not validated')
    res = make_response({ "errors": [form.errors[error][0] for error in form.errors]}, 401)
    return jsonify(res)
