// import { csrfFetch } from "./csrf"

const GET_POSTS = 'posts/getPosts'

const load = (payload) => {
    return {
        type: GET_POSTS,
        payload
    }
}

const getPosts = () => async dispatch => {
    const response = await fetch('/api/posts')
    if (response.ok){
        let posts = response.json()
        dispatch(load(posts))
    }
}


const initialState = {}
const postReducer = (state = initialState, action) => {
    switch (action.type){
        case GET_POSTS: {
            const newState = {}
            action.payload.posts.forEach( post => newState[post.id] = post)
            return newState
        }
        default:
            return state
    }
}

export default postReducer
