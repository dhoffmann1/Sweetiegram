from flask_wtf import FlaskForm
from wtforms import StringField

class LikeForm(FlaskForm):
    like = StringField("Like")
