import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Comments.css";
import { readCommentsThunk } from "../../store/comments";

const Comments = ({ postId }) => {
  // useSelectors
  const postsObj = useSelector((state) => state.posts);
  // const post = posts[postId]
  // const allCommentsObj = useSelector(state => state.comments)
  const allCommentsArr = Object.values(postsObj.comments);
  console.log(allCommentsArr);

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
            <div>{comment.content}</div>
            <div>{comment.createdAt}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
