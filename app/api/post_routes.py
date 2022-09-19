from flask import Blueprint, jsonify, session, request, redirect
from flask_login import login_required, current_user
from app.models import User, db, Post, follows
from app.forms import LoginForm, SignUpForm, PostForm
# added here
from sqlalchemy.orm import aliased
import json

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
        try:
            select_user = User.query.get(int(current_user.id))
            post = Post(
                post_url= str(form.data["post_url"]),
                city= str(form.data["city"]),
                state= str(form.data["state"]),
                country= str(form.data["country"]),
                caption= str(form.data["caption"]),
                user = select_user
            )
        except:
            # abort(404)
            return {"error": "your post has an issue... please try again"}, 404
        print('post instantiated:', post.to_dict())
        db.session.add(post)
        db.session.commit()
        created_post = Post.query.filter(current_user.id == post.owner_id).order_by(Post.created_at.desc()).first()
        # return redirect("/")
        print('created post from db:', created_post.to_dict())
        return created_post.to_dict(), 201
    if form.errors:
        print('errors:', form.errors)
        return form.errors


@post_routes.route('/<int:post_id>', methods = ['PATCH'])
@login_required
def update_post(post_id):
    form = PostForm()
    print("post id:", post_id)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        try:
            post = Post.query.get(int(post_id))
            print('post retrieved:', post.to_dict())
            post_data_bytes = request.data
            new_data = json.loads(post_data_bytes.decode('utf-8'))
            print('converted from byte:', new_data)
            for k,v in new_data.items():
                setattr(post, k, v)

            # print('request.data:', request.data)
            # print('request.data TYPE:', type(request.data))
            # print('request.form:', request.form.get('post_url'))
            db.session.commit()
            updated_post = Post.query.get(int(post_id))
            return updated_post.to_dict()
        except:
            return {"error": "your post has an issue... please try again"}, 404
    if form.errors:
        # abort(404)
        print('errors:', form.errors)
        return form.errors
