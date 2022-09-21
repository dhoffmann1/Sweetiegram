import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateCommentThunk } from "../../store/comments";


const EditComment = ({comment, showEditTextField, setShowEditTextField}) => {

    const [commentContent, setCommentContent] = useState(comment.content)

    const dispatch = useDispatch();


    const editSubmitted = async () => {
        e.preventDefault()

        const editOneComment = dispatch(updateCommentThunk(commentContent))
        if (editOneComment) {
            console.log('comment updated')
            setShowEditTextField(false)
        }

    }
 
    // useEffect(() => {
    //     setCommentContent(comment.content)
    // }, [commentContent])


    return (
        <>
        {showEditTextField && 
        <form onSubmit={editSubmitted}>
            <input 
            type="textarea"
            value={comment}
            onChange={(e) => setCommentContent(e.target.value)}>
            </input>
            <button type="submit">Submit</button>
        </form>
        }
        </>
    )

}

export default EditComment;
