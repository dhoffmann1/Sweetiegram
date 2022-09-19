from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, db, Post, Comment
from app.forms import CommentForm
from .auth_routes import validation_errors_to_error_messages
# added here
from sqlalchemy.orm import aliased

comment_routes = Blueprint('comments', __name__)

@comment_routes.route("/<int:id>", methods=["GET"])
def get_comments(id):
    posts = Post.query.get(id)
    
    # error = {
    #     "message": "Post couldn't be found",
    #     "statusCode": 404
    # }

    #if the post id exists
    
    return posts.to_dict_comments()


@comment_routes.route("/<int:id>", methods=["POST"])
@login_required
def new_comment(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    posts = Post.query.get(id)
    if form.validate_on_submit():
        new_comment = Comment(
            content=form.data['content'],
            post_id=id,
            user_id=current_user.id
        )

        db.session.add(new_comment)
        db.session.commit()
        #returning that posts comments
        return posts.to_dict_comments()
    
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400




@comment_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_comment(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # posts = Post.query.get(id)
    updateComment = Comment.query.get(id)
    if updateComment == None:
        return {"message": "comment cannot be found"}

    if form.validate_on_submit():
        updateComment.content = form.data['content']
        db.session.commit()
        #returning that posts comments
        return updateComment.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# DELETE a RESOURCE
# comment_to_delete = Comment.query.get(1)
# db.session.delete(comment_to_delete)
# db.session.commit()


@comment_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_comment(id):

    #if the user logged in is the owner of the comment, i should be able to delete
  
    comment = Comment.query.get(id)
    if comment == None:
        return {"message": "comment cannot be found"}
    # print("THIS IS THE USER", userComment)
    if comment.user_id != current_user.id:
        return {"message": "Forbidden"}, 403
        # return {'errors': validation_errors_to_error_messages(form.errors)}, 403

    db.session.delete(comment)
    db.session.commit()
    return {"message": "Successfully deleted"}
 
