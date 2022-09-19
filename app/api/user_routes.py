from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Post

user_routes = Blueprint('users', __name__)


@user_routes.route('')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

# tiff changed here
# @user_routes.route('/profile')
# @login_required
# def user():
#     print('user object in Post Class:', Post.user)
#     user = User.query.get(current_user.id)
#     return user.to_dict()

@user_routes.route('/<int:id>')
@login_required
def user(id):
    print('user object in Post Class:', Post.user)
    user = User.query.get(id)
    return user.to_dict()
