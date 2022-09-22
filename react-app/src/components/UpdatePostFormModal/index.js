import PostForm from "./PostForm"
import {NavLink, useParams} from "react-router-dom"
import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useState, useEffect} from 'react'
import {getPosts} from "../../store/post"
import { Modal } from "../../context/PostFormModal"
import "../../context/Modal.css"

// setPostFormModal should be send as props needs to be declared in GET post component (daniel's)
// postID should be sent as props from GET post component
const UpdatePostFormModal = () => {
    let {postId} = useParams()
    const [postFormModal,setPostFormModal] = useState('')
    const dispatch = useDispatch()
    const posts = useSelector(state=> state.posts)
    // console.log("post obj in update form:", posts)
    const postObj = posts[postId]
    // console.log('post object:', postObj)

    //payload should only include 4 fields... , pass postId as another prop
    let post;
    if (postObj){
        post = {
            id: postObj.id,
            post_url: postObj.postUrl? postObj.postUrl: "",
            city: postObj.city? postObj.city: "",
            state: postObj.state? postObj.state: "",
            country: postObj.country? postObj.country: "",
            caption: postObj.caption? postObj.caption: ""
        }
    }
    // console.log('post:', post)

    // TODO: change this to a prop later after merge
    useEffect(()=> {
        dispatch(getPosts())
    }, [dispatch])

    return (
        <>
            {post && (
                // <Modal onClose={()=> setPostFormModal(false)}>
                <PostForm post={post} setPostFormModal={setPostFormModal} postFormModal={postFormModal}/>
                // </Modal>
            )}
        </>
    )
}

export default UpdatePostFormModal
