const GET_FOLLOWINGS = 'followings/getFollowings'

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


const initialState = {}
const followingReducer = (state = initialState, action) =>{
    switch (action.type){
        case GET_FOLLOWINGS: {
            const newState = {}
            action.payload.following_users.forEach( user => newState[user.id] = user)
            return newState
        }
        default:
            return state

    }
}

export default followingReducer
