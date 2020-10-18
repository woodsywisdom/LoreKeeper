from flask import Blueprint, jsonify, url_for, request, redirect, make_response
from flask_login import LoginManager, current_user, login_user, logout_user
from werkzeug.datastructures import MultiDict
from flask_wtf.csrf import generate_csrf

from app.models import User, db
from app.forms import LoginForm, SignupForm

login_manager = LoginManager()

session = Blueprint('session', __name__)


def format_user(user):
  formatted_user = user.to_dict()
  formatted_user['campaigns'] = [ campaign.to_dict() for campaign in formatted_user['campaigns'] ]

  # print(f'&&&&&&&&&&{formatted_user}')
  return formatted_user

@session.route('/login/', methods=["POST", ])
def login():
  data = request.json
  print(f"data: {data}")
  form = LoginForm(username=data['username'], password=data['password'])
  print(f"form-data: {form.data}")
  if not data:
    print(f'no request data')
    return make_response({'errors': ['no request data']}, 400)
  if form.validate():
    print(f'---------------form validated')
    print(f"---------------data.username: {data['username']}")
    user = User.query.filter(User.username == data["username"]).first()
    print(f"________________user to be logged in: {user}")
    if user and user.check_password(data['password']):
      formatted_user = format_user(user)
      print(f'********{formatted_user}')
      login_user(user)
      print('_____user logged in_____')
      print(f'*********{formatted_user}')
      return formatted_user
  else:
    res = make_response({ "errors": [form.errors[error][0] for error in form.errors]}, 401)
    return res

@session.route('/logout/')
def logout():
  logout_user()
  print("_____user logged out_____")
  return make_response({ 'errors': None, })

@session.route("/csrf/", methods=["GET", ])
def csrf():
  csrf_token = generate_csrf()
  res = make_response("creating csrf_token")
  res.set_cookie("XSRF-TOKEN", csrf_token)
  return res

@session.route('/current-user/')
def currentuser():
  print(f'_______{dir(current_user)}')
  if current_user.is_anonymous:
    return make_response({ 'user': dict({}), 'errors': ['anonymous user is logged in']} )
  return make_response({'user': format_user(current_user)})
