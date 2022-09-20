// import { csrfFetch } from "./csrf"

const GET_POSTS = 'posts/getPosts'

const load = (payload) => {
    return {
        type: GET_POSTS,
        payload
    }
}

export const getPosts = () => async dispatch => {
    const response = await fetch('/api/posts')
    console.log(response)
    if (response.ok) {
        let posts = await response.json()
        dispatch(load(posts))
        return posts
    }
}


const initialState = {}
const postReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case GET_POSTS: {
            newState = {}
            action.payload.posts.forEach(post => newState[post.id] = post)
            return newState
        }
        default:
            return state
    }
}

export default postReducer
