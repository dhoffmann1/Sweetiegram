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
    const post = posts[postId]
    console.log('post:', post)

    // TODO: change this to a prop later after merge
    useEffect(()=> {
        dispatch(getPosts())
    }, [dispatch])

    return (
        <>
            <h3> update post form</h3>
            {post && (
                <Modal onClose={()=> setPostFormModal(false)}>
                    <PostForm post={post} setPostFormModal={setPostFormModal} postFormModal={postFormModal}/>
                </Modal>
            )}
        </>
    )
}

export default UpdatePostFormModal
