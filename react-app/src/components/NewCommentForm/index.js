import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createCommentThunk } from "../../store/comments";

const CommentForm = ({ postId }) => {
  const dispatch = useDispatch();

  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('content from handleSubmit function', content)
    console.log('postId in handleSubmit function', postId)

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
          <button id="comment-submit-button" type="submit">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentForm;
