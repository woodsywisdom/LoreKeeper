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
  return jsonify(formatted_user)

@session.route('/login/', methods=["POST", ])
def login():
  data = MultiDict(request.json)
  # print(f"data: {data}")
  form = LoginForm(MultiDict(mapping = data))
  # print(f"form-data: {form.data}")
  if not data:
    return jsonify({'errors': ['no request data']})
  if form.validate():
    user = User.query.filter(User.username == data["username"]).first()
    # print(f"________________user to be logged in: {user}")
    if user and user.check_password(data['password']):
      formatted_user = format_user(user)
      # print(f'********{format_user}')
      login_user(user)
      # print('_____user logged in_____')
      # print(f'*********{format_user}')
    return formatted_user
  else:
    res = make_response({ "errors": [form.errors[error][0] for error in form.errors]}, 401)
    return jsonify(res)

@session.route('/logout/')
def logout():
  logout_user()
  print("_____user logged out_____")
  return jsonify({ 'errors': None, })

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
    return make_response({ 'errors': ['anonymous user is logged in']}, 401 )
  return format_user(current_user)
