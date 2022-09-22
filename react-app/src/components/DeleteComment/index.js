import React from "react";
import { useDispatch } from "react-redux";
import { deleteCommentThunk } from "../../store/comments";



const DeleteComment = ({ commentId }) => {
  const dispatch = useDispatch();

  const deleteComment = async (commentId) => {
    const deleteOneComment = await dispatch(deleteCommentThunk(commentId));
    if (deleteOneComment) {
        console.log("comment deleted")
      }
  };

  return (
    <div>
      <button onClick={deleteComment(commentId)}> Delete Comment </button>
    </div>
  );
};

export default DeleteComment;
