import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Comments.css";
import { deleteCommentThunk, readCommentsThunk, updateCommentThunk } from "../../store/comments";



const Comments = ({ postId }) => {

  const logedInUser = useSelector(state => state.session.user);

  // useSelectors
  const postsObj = useSelector((state) => state.posts);
  // const post = posts[postId]
  // const allCommentsObj = useSelector(state => state.comments)
  const allCommentsArr = Object.values(postsObj.comments);
  console.log(allCommentsArr);

  const deleteComment = async (id) => {
    const deleteOneComment = await dispatch(deleteCommentThunk(id))
    return deleteOneComment
  }

  const editComment = async (id) => {
    const updateOneComment = await dispatch(updateCommentThunk(id))
    return (
      <div>
        <input type="textarea" name="edit">
        </input>
        <button type="submit">Submit</button>
      </div>
    )
  }

  const dispatch = useDispatch();
  //   const readComment = async (postId) => {
  //     const comment = await dispatch(readCommentsThunk)
  //   }

  useEffect(() => {
    dispatch(readCommentsThunk(postId));
  }, [dispatch]);

  return (
    <div>
      <div>{postsObj.user.username}</div>
      <div>{postsObj.user.profilePicUrl}</div>
      <div>{postsObj.caption}</div>
      {allCommentsArr.map((comment) => {
        return (
          <div>
            <div>{comment.profilePicUrl}</div>
            <div>{comment.username}</div>
            <div>{comment.content}
            {comment?.user_id === logedInUser?.id ? <button className="delete-comment-button" onClick={() => deleteComment(comment.id)}>Delete Comment</button> : null}
            {comment?.user_id === logedInUser?.id ? <button className="edit-comment-button" onClick={() => editComment(comment.id)}>Edit Comment</button> : null}
            </div>
            <div>{comment.createdAt}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Comments;



