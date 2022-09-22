// import { csrfFetch } from "./csrf"

// this is for main page
const GET_POSTS = 'posts/getPosts'
const GET_YOUR_PROFILE= 'posts/getYourProfile'
// this is for user profile
const GET_USER_PROFILE = 'posts/getUserProfile'
const CREATE_POST = 'posts/createPost'
const UPDATE_POST = 'posts/updatePost'
const DELETE_POST = 'posts/deletePost'

const load = (payload) => {
    return {
        type: GET_POSTS,
        payload
    }
}


const loadYourPosts = (payload) => {
    return {
        type: GET_YOUR_PROFILE,
        payload
    }
}

const loadUserPosts = (payload) => {
    return {
        type: GET_USER_PROFILE,
        payload
    }
}

const create = (payload) => {
    return {
        type: CREATE_POST,
        payload
    }
}

const update = (payload) => {
    return {
        type: UPDATE_POST,
        payload
    }
}

const remove = (id) => {
    return {
        type: DELETE_POST,
        id
    }
}

export const getPosts = () => async dispatch => {
    // @post_routes.route('', methods=["GET"])
    const response = await fetch('/api/posts/', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })

    console.log(response)
    if (response.ok) {
        let posts = await response.json()
        dispatch(load(posts))
        return posts
    }
}


export const getYourPosts = () => async dispatch => {
    const response = await fetch(`/api/users/posts`)
    if (response.ok){
        const posts = await response.json()
        console.log('posts data from YOUR profile route in thunk:', posts )
        dispatch(loadYourPosts(posts))
    }

}

export const getUserPosts = (userId) => async dispatch => {
    const response = await fetch(`/api/users/${userId}/posts`)
    if (response.ok){
        const posts = await response.json()
        console.log('posts data from USER profile route in thunk:', posts )
        dispatch(loadUserPosts(posts))
    }
}
// IMPORTANT: make sure the object you send from from is snake cased in keys
export const createPost = (payload) => async dispatch => {
    const response = await fetch('/api/posts', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    })
    if (response.ok){
        const post = await response.json()
        dispatch(create(post))
    }
}

export const editPost = (payload) => async dispatch => {
    const response = await fetch(`/api/posts/${payload.id}`,{
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    })
    console.log('response in editPost:', response)
    if (response.ok){
        const post = await response.json()
        dispatch(update(post))
    }
}


export const deletePost = (id) => async dispatch => {
    const response = await fetch(`/api/posts/${id}`,{
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(id)
    })
    if (response.ok) {
        dispatch(remove(id))
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
        case GET_YOUR_PROFILE: {
            const newState = {}
            action.payload.posts.forEach( post => newState[post.id] = post)
            return newState
        }
        case GET_USER_PROFILE:{
            const newState = {}
            action.payload.posts.forEach( post => newState[post.id] = post)
            return newState

        }
        case CREATE_POST: {
            const newState = {...state}
            newState[action.payload.id] = action.payload
            return newState
        }
        case UPDATE_POST: {
            const newState = {...state}
            newState[action.payload.id] = action.payload
            return newState

        }
        case DELETE_POST: {
            const newState = {...state}
            delete newState[action.id]
            return newState
        }
        default:
            return state
    }
}

export default postReducer
