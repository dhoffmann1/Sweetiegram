from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, db, Post, follows
from app.forms import LoginForm
from app.forms import SignUpForm
# added here
from sqlalchemy.orm import aliased

post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
@login_required
def index():
    # posts = Post.query.join(User).filter(Post.owner_id.in_([2,3,4,5])).all()
    # TODO: querying the join table: follows
    UserAlias = aliased(User)
    following_ids = [
        user.id for user in
        User.query.join(UserAlias.followers)
        .with_entities(UserAlias).filter(User.id == current_user.id).all()
    ]
    # print('num following')
    # return {"following": str(users_following)}
    posts = Post.query.join(User).filter(Post.owner_id.in_(following_ids)).all()
    print("length of posts:", len(posts))
    return {"posts": [post.to_dict() for post in posts]}
