import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Comments.css";
import { readCommentsThunk, deleteCommentThunk } from "../../store/comments";
// import DeleteComment from "../DeleteComment/index";
import EditComment from "../EditComment/index";
import "./Comments.css"
import { NavLink } from "react-router-dom";





const Comments = ({ setShowPostDetailsModal, post }) => {

  const loggedInUser = useSelector(state => state.session.user);
  const commentsObj = useSelector((state) => state.comments);
  const [showEditTextField, setShowEditTextField] = useState(false);
  const [showEditTextFieldCommentId, setShowEditTextFieldCommentId] = useState(0);
  const dispatch = useDispatch();

  const postTimerFunc = comment => {
    const datePosted = new Date(comment.createdAt)
    const now = Date.now()
    const milliseconds = Math.abs(now - datePosted)
    const minutes = Math.ceil(milliseconds / (1000 * 60))
    const hours = Math.ceil(milliseconds / (1000 * 60 * 60))
    const days = Math.ceil(milliseconds / (1000 * 60 * 60 * 24))

    let postTimer;
    if (minutes < 60) {postTimer = (<>{minutes} minutes ago</>)}
    else if (hours < 24) {postTimer = (<>{hours} hours ago</>)}
    else {postTimer = (<>{days} days ago</>)}

    return postTimer
  }

  useEffect(() => {
    dispatch(readCommentsThunk(post.id));
  }, [dispatch, post.id]);

  if (!commentsObj) return (
    <>
      <div>This post has no comments.</div>
    </>
  )

  const allCommentsArr = Object.values(commentsObj);
    // Thunk action dispatch for READ

  return (
    <div>
      <div id="comments-caption-section">
        <div id="profileimg-username-container">
          <div id="comments-caption-profile-pic-container">
            <img id="comments-caption-profile-pic-image" src={post.user.profilePicUrl} alt='userProfilePic' />
          </div>
          <div id="comments-caption-username-caption"><NavLink onClick={() => setShowPostDetailsModal(false)} id="comments-caption-username" to={`/users/${post.user.id}`}>{post.user.username}</NavLink> {post.caption}</div>
        </div>
      </div>
      <div id="comments-all-comments-section">
        {allCommentsArr.map((comment) => {
          return (
            <div id="comments-single-comment-container" key={comment.id}>
              <div id="comments-single-comment-image-username-createdAt-container">
                <div id="comments-single-comment-image-container">
                  <img id="comments-single-comment-image" src={comment.User.profilePicUrl} alt="profilePicUrl" />
                </div>
                <div id="comments-single-comment-username-createdAt-wrapper">
                  <div id="comments-single-comment-username-content"><NavLink onClick={() => setShowPostDetailsModal(false)} id="comments-single-comment-username" to={`/users/${comment.User.id}`}>{comment.User.username}</NavLink> {comment.content}</div>
                  <div id="comments-single-comment-createAt-edit-delete-buttons-container">
                    <div id="comments-single-comment-createdAt">{postTimerFunc(comment)}</div>
                    <div id="comments-single-comment-edit-delete-buttons-container">
                      {comment?.userId === loggedInUser?.id && <button id="comments-single-comment-edit-button" onClick={() => {
                        setShowEditTextField(!showEditTextField)
                        setShowEditTextFieldCommentId(comment.id)}}>Edit</button>}
                      {comment?.userId === loggedInUser?.id && <button id="comments-single-comment-delete-button" onClick={() => dispatch(deleteCommentThunk(comment.id))}>Delete</button>}
                    </div>
                  </div>
                </div>
              </div>
              {showEditTextField && showEditTextFieldCommentId === comment.id &&
                <EditComment comment={comment} setShowEditTextField={setShowEditTextField} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comments;
