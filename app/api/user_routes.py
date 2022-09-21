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
    if user == None:
        return { "message": "User couldn't be found"}, 404
    return user.to_dict()



# ------------------------------------------------------
# # TIFF ADDED HERE FOR profile page, add another route
# FOR ANOTHER USER PROFILE
@user_routes.route("/<int:user_id>/posts", methods = ['GET'])
def profile_page(user_id):
    user = User.query.get(user_id)
    if user == None:
        return { "message": "User couldn't be found"}, 404

    posts = Post.query.filter(Post.owner_id == user_id).all()
    return {"posts": [post.to_dict() for post in posts]}

# FOR YOUR PROFILE
@user_routes.route("/posts", methods = ['GET'])
@login_required
def your_profile_page():
    posts = Post.query.filter(Post.owner_id == current_user.id).all()
    return {"posts": [post.to_dict() for post in posts]}
