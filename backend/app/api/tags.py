from flask import Blueprint, jsonify, make_response, request
from flask_login import login_required, current_user

from app.models import Note, Tag, db

tags = Blueprint('tags', __name__)


@tags.route('/<tag_id>/')
@login_required
def load_notes(tag_id):
  tag = Tag.query.get(tag_id)

  formatted_notes = [ note.to_dict() for note in tag.notes ]

  res = make_response({ 'savedNotes': formatted_notes })
  return res

@tags.route('/<tag_id>/', methods=['PUT', ])
@login_required
def recategorize_tag(tag_id):
  data = request.json
  tag = Tag.query.get(tag_id)
  if int(current_user.get_id()) == tag.user_id:
    tag.category_id = int(data['newCategoryId'])
    db.session.commit()
    return make_response({'updated_tag': tag.to_dict() })
  else:
    return make_response({ 'errors': 'You do not have permission to edit this tag' }, 401)
