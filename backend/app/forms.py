from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, Email, Length, EqualTo


class LoginForm(FlaskForm):
  username = StringField("username", validators=[DataRequired()])
  password = PasswordField("password", validators=[DataRequired()])

class SignupForm(FlaskForm):
  username = StringField("username", validators=[DataRequired(), Length(min=5, message="Username must be at least 5 characters long")])
  email = StringField("email", validators=[DataRequired(), Email(message="Must contain a valid email address")])
  password = PasswordField("password", validators=[DataRequired()])
  passwordConfirm = PasswordField("password", validators=[DataRequired(), EqualTo(password, message="Password fields must match each other")])
