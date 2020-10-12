from flask import Blueprint, jsonify, make_response, request
from flask_login import login_required, current_user

from app.models import Note, Tag, db

notes = Blueprint('notes', __name__)


@notes.route('/<tag_id>/')
@login_required
def load_notes(tag_id):
  tag = Tag.query.get(tag_id)

  formatted_notes = [ note.to_dict() for note in tag.notes ]

  return make_response({ 'savedNotes': formatted_notes })
