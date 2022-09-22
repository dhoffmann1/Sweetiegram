import {NavLink} from "react-router-dom"
import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useState, useEffect} from 'react'
import { Modal } from "../../context/PostFormModal"
// import { Modal } from "../../context/Modal"
// import "./PostForm.css"
import PostForm from "./PostForm"
import "../../context/Modal.css"

const CreatePostFormModal = ({setPostFormModal, postFormModal}) => {
    console.log("modal import:", Modal)
    return (
        <>
            <Modal onClose={()=> setPostFormModal(false)}>
                <PostForm setPostFormModal={setPostFormModal} postFormModal={postFormModal}/>
            </Modal>
        </>
    )
}

export default CreatePostFormModal
