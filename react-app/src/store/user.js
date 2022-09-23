const GET_USER = 'session/GET_USER';
const RESET_USER_POSTS = 'session/resetUserPosts'
const getUser = (payload) => {
    return {
      type: GET_USER,
      payload
    }
  }

export const getUserDetail = (userId) => async dispatch => {
const response = await fetch(`/api/users/${userId}`)
if (response.ok){
    let user = await response.json()
    console.log('user searched in thunk:', user)
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
        case GET_USER: {
            console.log('initial state in user session:', initialState)
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
