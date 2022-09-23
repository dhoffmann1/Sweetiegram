const GET_FOLLOWINGS = 'followings/getFollowings'
const RESET_FOLLOWINGS = 'followings/resetFollowings'
const CREATE_FOLLOWING = "followings/createFollowings"
const DELETE_FOLLOWING = "following/deleteFollowings"


// AC => GET Following
const load = (payload) => {
    return {
        type: GET_FOLLOWINGS,
        payload
    }
}

// AC => CREATE Following
const createFollowing = (user) => {
    return {
        type: CREATE_FOLLOWING,
        user
    }
}

// AC => DELETE Following
const deleteFollowings = (userId) => {
    return {
        type: DELETE_FOLLOWING,
        userId
    }
}


export const resetFollowings = () => {
    return {
        type: RESET_FOLLOWINGS
    }
}

// AC THUNK => CREATE Following
export const createFollowingsThunk = (userId) => async dispatch => {
    const response = await fetch(`/api/user/${userId}/following`, {
        method: "POST"
    })
    if (response.ok) {
        let followingUser = await response.json()
        dispatch(createFollowing(followingUser))
    }
}

// AC THUNK => DELETE Following
export const deleteFollowingsThunk = (userId) => async dispatch => {
    const response = await fetch(`/api/user/${userId}/following`, {
        method: "DELETE"
    })
    if (response.ok) {
        dispatch(deleteFollowings(userId))
    }
}


// AC THUNK => GET Following
export const getFollowings = (userId) => async dispatch => {
    const response = await fetch(`/api/user/${userId}/following`)
    if (response.ok) {
        let followings = await response.json()
        dispatch(load(followings))
    }
}


const initialState = {}
const followingReducer = (state = initialState, action) =>{
    switch (action.type){
        case GET_FOLLOWINGS: {
            const newState = {}
            action.payload.following_users.forEach( user => newState[user.id] = user)
            return newState
        }
        case CREATE_FOLLOWING: {
            const newState = { ...state }
            newState[action.user.id] = action.user
            return newState
        }
        case DELETE_FOLLOWING: {
            const newState = { ...state }
            delete newState[action.userId]
            return newState
        }
        case RESET_FOLLOWINGS: {
            return {}
        }
        default:
            return state

    }
}

export default followingReducer
