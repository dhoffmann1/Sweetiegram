

// Action Type Variables 
const CREATE = "comment/CREATE"
const READ = "comment/READ"
const UPDATE = "comment/UPDATE"
const DELETE = "comment/DELETE"


// AC => CREATE 
export const createComment = (comment) => ({
    type: CREATE,
    comment
})


// AC => READ 
export const readComments = (comments) => {
    return {
        type: READ,
        comments
    }
}


// AC => UPDATE 

export const updateComment = (comment) => {
    return {
        type: UPDATE,
        comment
    }
}


// AC => DELETE 

export const commentDelete = (commentId) => {
    return {
        type: DELETE,
        commentId
    }
}

// THUNK ACs

export const readCommentsThunk = (postId) => async dispatch => {
    const response = await fetch(`/api/posts/${postId}/comments`)
    if (response.ok) {
        const comments = await response.json();
        dispatch(readComments(comments))
        return comments
    }

}

export const createCommentThunk = (postId, comment) => async dispatch => {
    const response = await fetch (`/api/posts/${postId}/comments`, {
        method: "POST", 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(comment)
    })
    if (response.ok) {
        const comment = await response.json();
        dispatch(createComment(comment))
        return comment
    }
}

export const updateCommentThunk = (commentId, comment ) => async dispatch => {
    const response = await fetch (`/api/comments/${commentId}`, {
        method: "PUT", 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(comment)
    })
    if (response.ok) {
        const comment = await response.json();
        dispatch(updateComment(comment))
        return comment
    }
}


export const deleteCommentThunk = (commentId) => async dispatch => {
    const response = await fetch (`/api/comments/${commentId}`, {
        method: "DELETE"
    })
    if (response.ok) {
        dispatch(commentDelete(commentId))
    }
}
 



//Reducer
const commentReducer = (state = {}, action) => {
    switch (action.type) {
      
      default:
        return state;
    }
  };

export default commentReducer;
