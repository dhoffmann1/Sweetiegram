from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Post

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    # user = User.query.join(Post).filter(Post.owner_id == id)
    user = User.query.get(id)
    print('user', user)
    # print('user.to_dict()', user.to_dict())
    user_posts = Post.query.all()
    print('user_posts', user_posts)
    # do query for just the posts belonging to this user and name it user_posts
    return str(user_posts)
    # return user.to_dict()
