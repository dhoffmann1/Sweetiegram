const GET_USER = 'session/GET_USER';
// ADDED HERE
const GET_ALL_USERS = 'session/GET_ALL_USERS'
const RESET_USER_POSTS = 'session/resetUserPosts'

const loadAll = (payload) =>{
    return {
        type: GET_ALL_USERS,
        payload
    }
}

const getUser = (payload) => {
    return {
      type: GET_USER,
      payload
    }
  }

export const getAllUsers = () => async dispatch => {
    const response = await fetch('/api/users')
    if (response.ok){
        let users = await response.json()
   
        dispatch(loadAll(users))
    }

}

export const getUserDetail = (userId) => async dispatch => {
const response = await fetch(`/api/users/${userId}`)
if (response.ok){
    let user = await response.json()

    dispatch(getUser(user))
    return user
}
}

export const resetUserPosts = () => {
    return {
        type: RESET_USER_POSTS
    }
}

const initialState = { user: null };
const userReducer = (state = initialState, action) => {
    switch (action.type){
        case GET_ALL_USERS:{
            let newState = {}
            action.payload.users.forEach(user => newState[user.id] = user)
            return newState
        }

        case GET_USER: {
            // const newState = {...initialState}
            // newState.user = action.payload
            // return newState
            return {user: action.payload}
        }
        case RESET_USER_POSTS: {
            return {}
        }
        default:
            return state
    }
}

export default userReducer
