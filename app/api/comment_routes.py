from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, db, Post, follows
from app.forms import LoginForm, SignUpForm, PostForm
# added here
from sqlalchemy.orm import aliased

comment_routes = Blueprint('comments', __name__, url_prefix="/api/posts")

@comment_routes.route("/<int:postsid>/comments")
def get_comments(id):
    postId = Post.query.get(id)
    comments = Comment.query.all()
