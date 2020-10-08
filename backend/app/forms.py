from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, TextAreaField
from wtforms.validators import DataRequired, Email, Length, EqualTo


class LoginForm(FlaskForm):
  username = StringField("username", validators=[DataRequired()])
  password = PasswordField("password", validators=[DataRequired()])

class SignupForm(FlaskForm):
  username = StringField("username", validators=[DataRequired(), Length(min=5, message="Username must be at least 5 characters long")])
  email = StringField("email", validators=[DataRequired(), Email(message="Must contain a valid email address")])
  password = PasswordField("password", validators=[DataRequired()])
  passwordConfirm = PasswordField("password", validators=[DataRequired(), EqualTo(password, message="Password fields must match each other")])

class CampaignForm(FlaskForm):
  title = StringField('title', validators=[DataRequired(), Length(max=50, message="Title cannot be longer than 50 characters")])
  description = TextAreaField('description')
