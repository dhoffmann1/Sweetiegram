import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Comments.css";
import { readCommentsThunk, updateCommentThunk } from "../../store/comments";
import DeleteComment from "../DeleteComment/index";
import EditComment from "../EditComment/index";




const Comments = ({ postId }) => {

  const loggedInUser = useSelector(state => state.session.user);



  // useSelectors
  const postsObj = useSelector((state) => state.posts);
  const allCommentsArr = Object.values(postsObj.comments);

  const [showEditTextField, setShowEditTextField] = useState(false)

    // Thunk action dispatch for READ 
    useEffect(() => {
      dispatch(readCommentsThunk(postId));
    }, [dispatch]);


  const editComment = async (comment) => {
    setShowEditTextField(true)
    return (
      <EditComment comment = {comment} setShowEditTextField = {setShowEditTextField} showEditTextField={showEditTextField} />

    )
  }

  const dispatch = useDispatch();
  //   const readComment = async (postId) => {
  //     const comment = await dispatch(readCommentsThunk)
  //   }

  

  return (
    <div>
      <div>
        <div>{postsObj.user.username}</div>
        <div>{postsObj.user.profilePicUrl}</div>
        <div>{postsObj.caption}</div>
      </div>
      <div>
        {allCommentsArr.map((comment) => {
          return (
            <div>
              <div>{comment.profilePicUrl}</div>
              <div>{comment.username}</div>
              <div>{comment.content}</div>
              {comment?.user_id === loggedInUser?.id ? <DeleteComment /> : null}
              {comment?.user_id === loggedInUser?.id ? <button className="edit-comment-button" onClick={() => editComment(comment)}>Edit Comment</button> : null}
              <div>{comment.createdAt}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comments;



