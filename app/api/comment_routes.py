from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, db, Post, Comment
from app.forms import CommentForm
# added here
from sqlalchemy.orm import aliased

comment_routes = Blueprint('comments', __name__)

@comment_routes.route("/<int:id>/comments", methods=["GET"])
def get_comments(id):
    posts = Post.query.get(id)
    
    # error = {
    #     "message": "Post couldn't be found",
    #     "statusCode": 404
    # }

    #if the post id exists
    
    return posts.to_dict_comments()


@comment_routes.route("/<int:id>/comments", methods=["POST"])
@login_required
def new_comment(id):
    form = CommentForm()
    posts = Post.query.get(id)
    if form.validate_on_submit():
        new_comment = Comment(
            content=form.data['content']
        )

        db.session.add(new_comment)
        db.session.commit()
        #returning that posts comments
        return posts.to_dict_comments()
    #not sure what this does... but found in the auth_route
    # return {'errors': validation_errors_to_error_messages(form.errors)}, 404





# UPDATING a RESOURCE
# comment_to_update = Comment.query.get(1)
# comment_to_update.content = 'Bradley'
# db.session.commit()
# DELETE a RESOURCE
# comment_to_delete = Comment.query.get(1)
# db.session.delete(comment_to_delete)
# db.session.commit()






# @comment_routes.route("/<int:id>/comments", methods=["PUT"])
# @login_required
# def new_comment(id):
#     form = CommentForm()
#     posts = Post.query.get(id)

#     #if the logged in user is the owner of the comment then they can edit conditional:



#     if form.validate_on_submit():
#         new_comment = Comment(
#             content=form.data['content']
#         )
        
#         db.session.add(new_comment)
#         db.session.commit()
#         #returning that posts comments
#         return posts.to_dict_comments()
#     #not sure what this does... but found in the auth_route
#     # return {'errors': validation_errors_to_error_messages(form.errors)}, 404
