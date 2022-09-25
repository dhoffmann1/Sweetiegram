// const GET_LIKES = 'likes/getLikes'
const CREATE_LIKE = 'likes/createLikes'
const DELETE_LIKE = 'likes/deleteLikes'

//actions
// const load = (payload) => {
//     return {
//         type: GET_LIKES,
//         payload
//     }
// }

const create = (payload) => {
    return {
        type: CREATE_LIKE,
        payload
    }
}

const remove = (id) => {
    return {
        type: DELETE_LIKE,
        id
    }
}

//thunks
// export const getLikesThunk = (id) => async dispatch => {
//     const response = await fetch(`/api/posts/${id}/likes`)
//     if (response.ok) {
//         let likes = await response.json()
//         dispatch(load(likes))
//     }
// }

// IMPORTANT: make sure the object you send from from is snake cased in keys
export const createLikesThunk = (id) => async dispatch => {
    const response = await fetch(`/api/posts/${id}/likes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(id)
    })
    if (response.ok) {
        const post = await response.json()
        dispatch(create(post))
    }
}


export const deleteLikesThunk = (id) => async dispatch => {
    const response = await fetch(`/api/posts/${id}/likes`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(id)
    })
    if (response.ok) {
        dispatch(remove(id))
    }
}


//reducer
const initialState = {}
const likesReducer = (state = initialState, action) => {
    switch (action.type) {
        // case GET_LIKES: {
        //     const newState = {}
        //     action.payload.following_users.forEach(user => newState[user.id] = user)
        //     return newState
        // }
        case CREATE_LIKE: {
            const newState = { ...state }
            newState[action.payload.id] = action.payload
            return newState
        }
        case DELETE_LIKE: {
            const newState = { ...state }
            delete newState[action.id]
            return newState
        }
        default:
            return state
    }
}

export default likesReducer
