from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, db, Post, Comment
from app.forms import CommentForm

follow_routes = Blueprint('follows', __name__)

@follow_routes.route("/<int:id>/following", methods=["GET"])
def follows(id):
    user = User.query.get(id)
    return user.to_dict_for_follows()



