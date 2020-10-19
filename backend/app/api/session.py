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
  # print(f"data: {data}")
  form = LoginForm(username=data['username'], password=data['password'])
  # print(f"form-data: {form.data}")
  if not data:
    # print(f'no request data')
    return make_response({'errors': ['no request data']}, 400)
  if form.validate():
    # print(f'---------------form validated')
    # print(f"---------------data.username: {data['username']}")
    user = User.query.filter(User.username == data["username"]).first()
    # print(f"________________user to be logged in: {user}")
    if user and user.check_password(data['password']):
      formatted_user = format_user(user)
      # print(f'********{formatted_user}')
      login_user(user)
      # print('_____user logged in_____')
      # print(f'*********{formatted_user}')
      return make_response(formatted_user, 200)
  res = make_response({ "errors": ['Invalid username/password', ]}, 401)
  return res

@session.route('/signup/', methods=['POST', ])
def signup():
  data = request.json
  print(f"___________username {data['username']}")
  if not data:
    return make_response({'errors': ['no request data']}, 400)
  if User.query.filter(User.username == data['username']).first():
    return make_response({ 'errors': ['username is already in use', ]}, 400)
  print(f'________username not found in database')
  form = SignupForm(username=data['username'],
                    password=data['password'],
                    password_confirm=data['passwordConfirm'], )
  print(f'_________{form.data}')
  if form.validate():
    new_user = User(username=data['username'],
                    password=data['password'], )
    db.session.add(new_user)
    db.session.commit()
    login_user(new_user)
    formatted_user = format_user(new_user)
    print(f'__________{formatted_user}')
    return make_response( formatted_user, 200)
  elif form.errors:
    print(f'_________{form.errors}')
    return make_response({ 'errors': [ error for errors in form.errors.values() for error in errors ]}, 400)
  else:
    return make_response({ 'errors': ['something went wrong']}, 400)


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
