from flask import Blueprint, jsonify, make_response, request
from flask_login import login_required, current_user
# from werkzeug.datastructures import MultiDict

from app.models import Category, db

categories = Blueprint('categories', __name__)

# @categories.route('/')
# @login_required
# def get_categories():categories = Category.query.options(subqueryload(Category.tags)).filter_by(user_id=current_user.id )

#   formatted_cats = { cat.id:cat.to_dict() for cat in categories }
#   current_tags = { tag.id:tag.to_dict() for tag in categories.tags }
