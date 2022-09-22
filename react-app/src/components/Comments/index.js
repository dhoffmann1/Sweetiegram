import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Comments.css";
import { readCommentsThunk, deleteCommentThunk } from "../../store/comments";
// import DeleteComment from "../DeleteComment/index";
import EditComment from "../EditComment/index";
import "./Comments.css"





const Comments = ({ post }) => {

  const loggedInUser = useSelector(state => state.session.user);
  const commentsObj = useSelector((state) => state.comments);
  const [showEditTextField, setShowEditTextField] = useState(false);
  const [showEditTextFieldCommentId, setShowEditTextFieldCommentId] = useState(0);
  const dispatch = useDispatch();

  // console.log('commentsObj in Comments Component', commentsObj)

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


  // const editComment = async (comment) => {
  //   console.log("showEditTextField before set", showEditTextField)
  //   setShowEditTextField(true)
  //   console.log("showEditTextField after set", showEditTextField)
  //   return (
  //     <>
  //     {showEditTextField &&
  //     <EditComment comment={comment} setShowEditTextField={setShowEditTextField} />}
  //     </>
  //   )
  // }

  return (
    <div>
      <div id="comments-caption-section">
        <div id="profileimg-username-container">
        <div id="comments-caption-profile-pic-container">
          <img id="comments-caption-profile-pic-image" src={post.user.profilePicUrl} alt='userProfilePic' />
        </div>
        <div id="comments-caption-username">{post.user.username}</div>
        {/* <div>{post.user.profilePicUrl}</div> */}
        </div>
        <div id="comments-caption-caption-text">{post.caption}</div>
      </div>
      <div id="comments-all-comments-section">
        {allCommentsArr.map((comment) => {
          return (
            <div id="comments-single-comment-container" key={comment.id}>
              {/* {console.log('comment in comments Component', comment)} */}
              <div id="image-username-container">
              <div id="comments-single-comment-image">
                <img id="comments-single-comment-images" src={comment.User.profilePicUrl} alt="profilePicUrl" />
              </div>
              <div id="comments-single-comment-username">{comment.User.username}</div>
              </div>
            
              <div id="comments-single-comment-content">{comment.content}</div>
              <div id="comments-single-comment-createdAt">{comment.createdAt}</div>
              {comment?.userId === loggedInUser?.id && <button id="comments-single-comment-edit-button" onClick={() => {
                showEditTextField === false ? setShowEditTextField(true) : setShowEditTextField(false);
                setShowEditTextFieldCommentId(comment.id)}}>Edit</button>}
              {comment?.userId === loggedInUser?.id && <button id="comments-single-comment-delete-button" onClick={() => dispatch(deleteCommentThunk(comment.id))}>Delete</button>}
              {showEditTextField && showEditTextFieldCommentId === comment.id &&
                <EditComment comment={comment} setShowEditTextField={setShowEditTextField} />}
              <br />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comments;
