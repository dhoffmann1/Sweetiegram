import {useDispatch, useSelector} from 'react-redux'
import {useState, useEffect} from 'react'
import {getPosts} from "../../store/post"
import {NavLink} from "react-router-dom"
import React from 'react'
import './Posts.css'


const Posts = () => {
    const dispatch = useDispatch();
    // useEffect(())
    return (
        <h1>posts page!</h1>
    )
}

export default Posts
