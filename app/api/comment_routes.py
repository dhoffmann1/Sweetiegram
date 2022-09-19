from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, db, Post, follows, Comment
from app.forms import LoginForm, SignUpForm, PostForm
# added here
from sqlalchemy.orm import aliased

comment_routes = Blueprint('comments', __name__)

@comment_routes.route("/<int:id>/comments", methods=["GET"])
def get_comments(id):
    comments = Comment.query.get(id)
    return comments.to_dict()
