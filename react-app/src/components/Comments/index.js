import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Comments.css";
import { readCommentsThunk, updateCommentThunk } from "../../store/comments";
import DeleteComment from "../DeleteComment/index";
import EditComment from "../EditComment/index";




const Comments = ({ post }) => {

  const loggedInUser = useSelector(state => state.session.user);



  // useSelectors
  const commentsObj = useSelector((state) => state.comments);
  // const postsObj = useSelector(state => state.posts)
  // const
  const [showEditTextField, setShowEditTextField] = useState(false)
  const dispatch = useDispatch();

  console.log(commentsObj)

  useEffect(() => {
    dispatch(readCommentsThunk(post.id));
  }, [dispatch]);

  if (!commentsObj) return (
    <>
      <div>This post has no comments.</div>
    </>
  )


  const allCommentsArr = Object.values(commentsObj);
    // Thunk action dispatch for READ


  const editComment = async (comment) => {
    setShowEditTextField(true)
    return (
      <EditComment comment = {comment} setShowEditTextField = {setShowEditTextField} showEditTextField={showEditTextField} />

    )
  }

  //   const readComment = async (postId) => {
  //     const comment = await dispatch(readCommentsThunk)
  //   }



  return (
    <div>
      <div id="comments-caption-section">
        <div id="comments-caption-username">{post.user.username}</div>
        <div id="comments-caption-profile-pic-container">
          {/* <img id="comments-caption-profile-pic-image" src={post.user.profilePicUrl} alt='userProfilePic' /> */}
        </div>
        {/* <div>{post.user.profilePicUrl}</div> */}
        <div id="comments-caption-caption-text">{post.caption}</div>
      </div>
      <div id="comments-all-comments-section">
        {allCommentsArr.map((comment) => {
          return (
            <div id="comments-single-comment-container">
              <div>{comment.profilePicUrl}</div>
              <div>{comment.username}</div>
              <div>{comment.content}</div>
              {comment?.user_id === loggedInUser?.id ? <DeleteComment commentId={comment.id} /> : null}
              {comment?.user_id === loggedInUser?.id ? <button className="edit-comment-button" onClick={() => editComment(comment)}>Edit Comment</button> : null}
              <div>{comment.createdAt}</div>
              <br />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comments;
