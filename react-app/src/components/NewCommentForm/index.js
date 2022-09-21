import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createCommentThunk } from "../../store/comments";

const CommentForm = ({ postId }) => {
  const dispatch = useDispatch();

  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createCommentThunk(postId, content));
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              id="content-area-input"
              type="textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              placeholder="Add a comment..."
            />
          </label>
        </form>
      </div>

      <div>
        <button id="comment-submit-button" type="Submit">
          Post
        </button>
      </div>
    </div>
  );
};

export default CommentForm;
