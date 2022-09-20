from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, db, Post, Comment
from app.forms import CommentForm

follow_routes = Blueprint('follows', __name__)

@follow_routes.route("/<int:id>/following", methods=["GET"])
def follows(id):
    user = User.query.get(id)
    if user == None:
        return {"message": "user couldn't be found"}, 404
    
    return user.to_dict_for_follows()


@follow_routes.route("/<int:id>/following", methods=["POST"])
@login_required
def add_following(id):

    user = User.query.get(id)
    if user == None:
        return {"message": "user couldn't be found"}, 404

    # currentUser = User.query.filter( User.id == current_user.id)
    # print("THIS IS THE CURRENT_USER", current_user.following)
    if current_user.id == user.id:
        return { "message": "you cannot follow yourself"}, 403

    if user in current_user.following:
        return {"message": f"You are already following user {id}"}
    current_user.following.append(user)
    db.session.commit()
    return current_user.to_dict_for_follows()


@follow_routes.route("/<int:id>/following", methods=["DELETE"])
@login_required
def remove_following(id):
    user = User.query.get(id)
    if user == None:
        return {"message": "user couldn't be found"}, 404

    if user not in current_user.following:
        return {"message": f"Currently not following user {id}"}

    current_user.following.remove(user)
    db.session.commit()
    return current_user.to_dict_for_follows()
