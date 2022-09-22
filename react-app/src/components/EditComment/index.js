import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCommentThunk } from "../../store/comments";
import "./EditComment.css"


const EditComment = ({ comment, setShowEditTextField }) => {
    const [commentContent, setCommentContent] = useState(comment.content)
    // console.log('comment in EditComment component', comment)
    // console.log('commentContent in EditComment component', commentContent)


    const dispatch = useDispatch();


    const editSubmitted = (e) => {
        e.preventDefault()
        const commentObj = { "content": commentContent }
        dispatch(updateCommentThunk(comment.id, commentObj))
        setShowEditTextField(false)
    }

    // useEffect(() => {
    //     setCommentContent(comment.content)
    // }, [commentContent])


    return (
        <form id="edit-comment-form" onSubmit={editSubmitted}>
            <input
            id="edit-comment-input-textarea"
            type="textarea"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}>
            </input>
            <button id="edit-comment-submit-button" type="submit">Submit</button>
        </form>
    )
}

export default EditComment;
