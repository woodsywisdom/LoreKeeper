from flask import Blueprint, jsonify, make_response
from flask_login import login_required, current_user
from app.models import User, Campaign

user_routes = Blueprint('users', __name__)

@user_routes.route('/<user_id>/campaigns/')
@login_required
def load_campaigns(user_id):
  if current_user.get_id() == user_id:
    campaigns_list = Campaign.query.filter(Campaign.user_id == user_id).all()
    formatted_campaigns = { campaign.id: campaign.to_dict() for campaign in campaigns_list }
    res = make_response({ 'campaigns': formatted_campaigns })
    return res
  else:
    return make_response({ 'campaigns': {}, 'errors': ["You do not have access to this user's campaigns"]}, 401)



@user_routes.route('/<id>/boards')
def index():
  response = User.query.all()
  print("user route______")
  return { "users": [user.to_dict() for user in response]}
