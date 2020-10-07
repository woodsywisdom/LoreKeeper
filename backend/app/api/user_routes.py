from flask import Blueprint, jsonify
from app.models import User

user_routes = Blueprint('users', __name__)

@user_routes.route('/<id>')
def getUser(id):
  response = User.query.get(id)
  return { 'user': response.to_dict() }



@user_routes.route('/<id>/boards')
def index():
  response = User.query.all()
  print("user route______")
  return { "users": [user.to_dict() for user in response]}
