from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Post

# from PIL import Image
import imghdr
import requests


def valid_post_url(form, field):
    post_url = field.data
    # error_tags = [ "404", "Video unavailable"]
    image_formats = [".png", ".jpeg", ".jpg", ".bmp"]

    for format in image_formats:
        if format in post_url:
            return
    raise ValidationError("Please enter a valid url link ")
    # if "youtube" in post_url.lower():
    #     # video type
    #     r = requests.get(post_url)
    #     for error in error_tags:
    #         if error in r.text:
    #             raise ValidationError("Video url is invalid.")

    # otherwise image type
    # try:
    #     r = requests.head(post_url)
    #     if r.headers["content-type"] not in image_formats:
    #         raise ValidationError('Image url format must be "bmp", "png", or "jpeg."')
    # except:
    #     raise ValidationError("Please enter a valid url link ")

    # image_format = imghdr.what(post_url)
    # valid_image_types = ['bmp', 'png', 'jpeg']
    # if image_format not in valid_image_types:
    #     raise ValidationError('Image url format must be "bmp", "png", or "jpeg."')


# def valid_video_url():
#     post_url = field.data
#     r = requests.get(post_url)
#     error_tags = [ "404", "Video unavailable"]
#     for error in error_tags:
#         if error in r.text:
#             raise ValidationError("Video url is invalid.")


class PostForm(FlaskForm):
    post_url  = StringField("Image/Video Url", validators=[DataRequired(), valid_post_url])
    # post_url2 = StringField("Video Url", validators=[DataRequired(), valid_video_url])
    city = StringField("City")
    state = StringField("State")
    country = StringField("Country")
    caption = StringField("Caption")
