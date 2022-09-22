const GET_FOLLOWINGS = 'followings/getFollowings'
const RESET_FOLLOWINGS = 'followings/resetFollowings'
const load = (payload) => {
    return {
        type: GET_FOLLOWINGS,
        payload
    }
}

export const getFollowings = (userId) => async dispatch => {
    const response = await fetch(`/api/user/${userId}/following`)
    if (response.ok) {
        let followings = await response.json()
        dispatch(load(followings))
    }
}

export const resetFollowings = () => {
    return {
        type: RESET_FOLLOWINGS
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
        case RESET_FOLLOWINGS: {
            return {}
        }
        default:
            return state

    }
}

export default followingReducer
