from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

notes_tags = db.Table('notes_tags',
  db.Column('note_id', db.Integer, db.ForeignKey('notes.id'), primary_key=True),
  db.Column('tag_id', db.Integer, db.ForeignKey('tags.id'), primary_key=True),
)

class User(UserMixin, db.Model):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  username = db.Column(db.String(40), nullable = False, unique = True)
  email = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password = db.Column(db.String(200), nullable = False)

  campaigns = db.relationship('Campaign', backref='user')
  # tags = db.relationship('Tag', backref='user')

  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email,
      "campaigns": self.campaigns,
    }

  @property
  def password(self):
    return self.hashed_password

  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)

  def check_password(self, password):
    return check_password_hash(self.password, password)

  def __repr__(self):
    return f'<User {self.username}>'


class Campaign(db.Model):
  __tablename__ = 'campaigns'

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(50), nullable=False)
  description = db.Column(db.Text)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

  tags = db.relationship('Tag', order_by='Tag.name', backref='campaign')

  def to_dict(self):
    return {
      "id": self.id,
      "title": self.title,
      "description": self.description,
      "user_id": self.user_id,
      "created_at": self.created_at,
      "tags": [ tag.id for tag in self.tags ],
    }

class Category(db.Model):
  __tablename__ = 'categories'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(25), nullable=False)
  description = db.Column(db.String(255), nullable=False)

  tags = db.relationship('Tag', lazy='subquery', backref='category')

  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name,
      "description": self.description,
      # "tags": [ tag.id for tag in self.tags ],
    }

  # def current_tags(self, user_id):
  #   return

class Tag(db.Model):
  __tablename__ = 'tags'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(25), nullable=False)

  campaign_id = db.Column(db.Integer, db.ForeignKey('campaigns.id'), nullable=False)
  category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
  # user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

  notes = db.relationship('Note', order_by='Note.created_at', secondary=notes_tags, backref='tags')

  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name,
      "campaign_id": self.campaign_id,
      "category_id": self.category_id,
      "notes": [ note.id for note in self.notes ],
    }

class Note(db.Model):
  __tablename__ = 'notes'

  id = db.Column(db.Integer, primary_key=True)
  content = db.Column(db.String(255), nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

  # tags = db.relationship('Tag', secondary=notes_tags, backref='notes')

  def to_dict(self):
    return {
      "id": self.id,
      "content": self.content,
      "created_at": self.created_at,
      "tags": [ tag.id for tag in self.tags ],
    }
