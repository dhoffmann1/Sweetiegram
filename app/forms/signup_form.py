from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import User


import requests


def valid_image_url(form, field):
    post_url = field.data
    image_formats = ["image/png", "image/jpeg", "image/jpg", "image/bmp"]
    # otherwise image type
    try:
        r = requests.head(post_url)
        if r.headers["content-type"] not in image_formats:
            raise ValidationError('Image url format must be "bmp", "png", or "jpeg."')
    except:
        raise ValidationError("Please enter a valid url link ")

def valid_bio(form, field):
    bio = field.data
    if len(bio) > 500:
        raise ValidationError("Bio cannot be more than 500 characters")


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def valid_email(form, field):
    email = field.data
    if "@" not in email:
        raise ValidationError('Invalid Email')


class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists, valid_email])
    password = StringField('password', validators=[DataRequired()])
    # added here
    profile_pic_url = StringField('profile pic url', validators=[DataRequired(), valid_image_url])
    bio = StringField('bio', validators=[valid_bio])
    first_name = StringField('first name', validators = [DataRequired()])
    last_name = StringField('last name', validators = [DataRequired()])
