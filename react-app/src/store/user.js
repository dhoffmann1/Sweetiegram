const GET_USER = 'session/GET_USER';

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
        default:
            return state
    }
}

export default userReducer
