import os
from flask import Flask, render_template, request, session
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_migrate import Migrate

from .models import db, User
from .api.user_routes import user_routes
from .api.session import session, login_manager
from .api.campaigns import campaigns

from .config import Config

# csrf = CSRFProtect()

app = Flask(__name__)
app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(session, url_prefix='/api/session')
app.register_blueprint(campaigns, url_prefix='/api/campaigns')
# csrf.init_app(app) #apply csrf protection to entirety of app?
db.init_app(app)
login_manager.init_app(app)
login_manager.login_view = 'session.login'
Migrate(app, db)


@login_manager.user_loader
def load_user(user_id):
  print('---------load user fired')
  if user_id is not None:
    print(f'--------- id {user_id}')
    return User.query.get(int(user_id))
  print(f'------- no valid user_id')
  return None

## Application Security
CORS(app)
@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') else False,
        samesite='Strict' if os.environ.get('FLASK_ENV') else None,
        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        print("favicon route_____")
        return app.send_static_file('favicon.ico')
    print("index route_____")
    return app.send_static_file('index.html')
