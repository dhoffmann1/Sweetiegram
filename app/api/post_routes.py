from flask import Blueprint, jsonify, session, request, redirect
from flask_login import login_required, current_user
from app.models import User, db, Post, follows
from app.forms import LoginForm, SignUpForm, PostForm
# added here
from sqlalchemy.orm import aliased

post_routes = Blueprint('posts', __name__)

@post_routes.route('/', methods=["GET"])
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

@post_routes.route('', methods = ['POST'])
@login_required
def create_post():
    print('hitting right route!')
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        select_user = User.query.get(int(current_user.id))
        try:
            post = Post(
                post_url= str(form.data["post_url"]),
                city= str(form.data["city"]),
                state= str(form.data["state"]),
                country= str(form.data["country"]),
                caption= str(form.data["caption"]),
                user = select_user
            )
        except:
            return {"error": "your post has an issue... please try again"}
        print('post instantiated:', post.to_dict())
        db.session.add(post)
        db.session.commit()
        created_post = Post.query.filter(current_user.id == post.owner_id).order_by(Post.created_at.desc()).first()
        # return redirect("/")
        print('created post from db:', created_post.to_dict())
        return created_post.to_dict()
    if form.errors:
        print('errors:', form.errors)
        return form.errors


@post_routes.route('', methods = ['PATCH'])
@login_required
def
