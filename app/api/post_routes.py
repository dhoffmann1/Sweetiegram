from flask import Blueprint, jsonify, session, request, redirect
from flask_login import login_required, current_user
from app.models import User, db, Post, follows, Comment
from app.forms import LoginForm, SignUpForm, PostForm, LikeForm, CommentForm
# added here
from sqlalchemy.orm import aliased
from .auth_routes import validation_errors_to_error_messages
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
    following_ids.append(current_user.id)
    posts = Post.query.join(User).filter(Post.owner_id.in_(following_ids)).order_by(Post.created_at.desc()).all()
    print("length of posts:", len(posts))
    return {"posts": [post.to_dict() for post in posts]}

@post_routes.route('/<int:post_id>', methods=['GET'])
@login_required
def get_post(post_id):
    # this will be through clicking - CHANGED you can see all users (conditional rendering on posts)
    post = Post.query.get(post_id)
    if post == None:
        return {"message": "Post couldn't be found"}, 404
    return post.to_dict()
    # UserAlias = aliased(User)
    # following_ids = [
    #     user.id for user in
    #     User.query.join(UserAlias.followers)
    #     .with_entities(UserAlias).filter(User.id == current_user.id).all()
    # ]
    # post_ids_viewable = [
    #     post.id for post in
    #     Post.query.join(User).filter(Post.owner_id.in_(following_ids)).all()
    # ]
    # if post_id in post_ids_viewable or post.owner_id == current_user.id:
    #     try:
    #         return post.to_dict()
    #     except:
    #         return {"message": "Post couldn't be found"}, 404
    # else:
    #     return {"message": "You must follow them in order to view their post"}, 403

@post_routes.route('', methods = ['POST'])
@login_required
def create_post():
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        try:
            # select_user = User.query.get(int(current_user.id))
            post = Post(
                post_url= str(form.data["post_url"]),
                city= str(form.data["city"]),
                state= str(form.data["state"]),
                country= str(form.data["country"]),
                caption= str(form.data["caption"]),
                user = current_user
            )
        except:
            return {"error": "SHOULD NEVER REACH HERE EVER"}, 404
        db.session.add(post)
        db.session.commit()
        # created_post = Post.query.filter(current_user.id == post.owner_id).order_by(Post.created_at.desc()).first()
        return post.to_dict(), 201
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400


@post_routes.route('/<int:post_id>', methods = ['PUT'])
@login_required
def update_post(post_id):
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = Post.query.get(int(post_id))
        if post == None:
            return {"errors": "Post couldn't be found"}, 404

        if post.owner_id != current_user.id:
            return {"errors": "Forbidden"}, 403
        post_data_bytes = request.data
        new_data = json.loads(post_data_bytes.decode('utf-8'))
        print('converted from byte:', new_data)
        for k,v in new_data.items():
            setattr(post, k, v)

        # print('request.data:', request.data)
        # print('request.form:', request.form.get('post_url'))
        db.session.commit()
        updated_post = Post.query.get(int(post_id))
        return updated_post.to_dict()

    return {"errors": validation_errors_to_error_messages(form.errors)}, 400


@post_routes.route('/<int:post_id>', methods = ['DELETE'])
@login_required
def delete_post(post_id):
    # authorization: must be right user
    post = Post.query.get(post_id)
    if post == None:
        return {"errors": "Post couldn't be found"}, 404
    if post.owner_id != current_user.id:
        return {"errors": "Forbidden"}, 403
    db.session.delete(post)
    db.session.commit()
    return {"message": "Successfully deleted"}


# LIKES FEATURE
# only like the posts you're following or belong to you
@post_routes.route('/<int:post_id>/likes', methods = ['POST'])
@login_required
def like_a_post(post_id):
    post = Post.query.get(post_id)
    if post == None:
        return {"errors": "Post couldn't be found"}, 404
    UserAlias = aliased(User)
    following_ids = [
        user.id for user in
        User.query.join(UserAlias.followers)
        .with_entities(UserAlias).filter(User.id == current_user.id).all()
    ]
    post_ids_viewable = [
        post.id for post in
        Post.query.join(User).filter(Post.owner_id.in_(following_ids)).all()
    ]
    print('post ids in likes route:', post_ids_viewable)
    if len(post.post_likes) > 0:
        for user in post.post_likes:
            if user.id == current_user.id:
                # trigger delete route? => invoke the function delete_like?
                # return delete_like(post_id, post)
                return {"errors": "User already liked post"}
    # this line does the validation for us, so we don't need a like form
    if post_id in post_ids_viewable or post.owner_id == current_user.id:
        # if form.validate_on_submit():
        user = User.query.get(current_user.id)
        print("post likes before:", len(post.post_likes))
        post.post_likes.append(user)
        print("post likes after:", len(post.post_likes))
        db.session.add(post)
        db.session.commit()
        return {"message": "Successfully liked"}
    else:
        return {"error": "you cannot like a person's post without following them"}, 404


@post_routes.route('/<int:post_id>/likes', methods = ['DELETE'])
@login_required
def delete_like(post_id):
    post = Post.query.get(post_id)
    if post == None:
        return {"errors": "Post couldn't be found"}, 404
    for user in post.post_likes:
        if user.id == current_user.id:
            post.post_likes.remove(user)
            db.session.add(post)
            db.session.commit()
            return {"message": "Successfully deleted"}


#----------------------------------------------------------------------------


@post_routes.route("/<int:id>/comments", methods=["GET"])
def get_comments(id):
    posts = Post.query.get(id)

    comments = Comment.query.order_by(Comment.created_at.asc()).filter(Comment.post_id == id).all()
    # error = {
    #     "message": "Post couldn't be found",
    #     "statusCode": 404
    # }

    #if the post id exists
    print("THIS IS THE COMMMENT", comments)
    return { "Comments": [comment.to_dict() for comment in comments],
            "numComments": len(comments)
    }


@post_routes.route("/<int:id>/comments", methods=["POST"])
@login_required
def new_comment(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    post = Post.query.get(id)
    if post == None:
        return { "message": "Post couldn't be found"}, 404


    if form.validate_on_submit():
        new_comment = Comment(
            content=form.data['content'],
            post_id=id,
            user_id=current_user.id
        )

        db.session.add(new_comment)
        db.session.commit()
        #returning that post comments
        return post.to_dict_comments()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# # TIFF ADDED HERE FOR profile page, add another route
# @post_routes.route("/profile", methods = ['GET'])
# @login_required
# def profile_page():
#     posts = Post.query.filter(Post.owner_id == current_user.id).all()
#     return {"posts": [post.to_dict() for post in posts]}

