from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Comment

def valid_comment(form, field):
    content=field.data
    if len(content) > 250:
        raise ValidationError("Comment is invalid.")


class CommentForm(FlaskForm):
    #do i need any validators for comments??
    content = StringField("Comment", validators=[DataRequired(), valid_comment])
