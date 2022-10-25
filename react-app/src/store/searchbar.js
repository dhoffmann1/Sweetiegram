const SEARCH_ALL_USERS = 'search/searchAllUsers'



const searchAll = (payload) => {
    return {
        type: SEARCH_ALL_USERS,
        payload
    }
}

//thunks
export const searchAllUsers = () => async dispatch => {
    const response = await fetch('/api/users')
    if (response.ok) {
        let users = await response.json()

        dispatch(searchAll(users))
    }

}


const initialState = {}
const searchReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case SEARCH_ALL_USERS: {
            let newState = {}
            action.payload.users.forEach(user => newState[user.id] = user)
            return newState
        }
        default:
            return state
    }
}

export default searchReducer
