from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, db, Post, Comment
from app.forms import CommentForm

follow_routes = Blueprint('follows', __name__)

@follow_routes.route("/<int:id>/following", methods=["GET"])
def follows(id):
    user = User.query.get(id)
    return user.to_dict_for_follows()




@follow_routes.route("/<int:id>/following", methods=["POST"])
@login_required
def add_followers(id):

    #you need their id, add their id to your following inside the "users_following" key, 
    #we want to add the person we want to follows id

    user = User.query.get(id)
    currentUser = User.query.filter( User.id == current_user.id)

    # currentUser.to_dict().users_following.append(user)
    # user.add_followers()
    print("THIS IS THE THING",user)
    print("THIS IS THE CURERNT USER???", currentUser)

    return user.to_dict_for_follows()


# def follow(id):
#     user = User.query.get(id)
#     user.follow()



# @follow_routes.route("/<int:id>/following", methods=["DELETE"])
# @login_required
# def remove_followers(id):
#     user = User.query.get(id)
#     return user.to_dict_for_follows()
