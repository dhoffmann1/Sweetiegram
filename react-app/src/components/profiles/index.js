import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { getPosts } from "../../store/post"
import { NavLink } from "react-router-dom"
import React from 'react'

const Profiles = () => {
    const dispatch = useDispatch();
    const following_users = useSelector((state) => state.posts)
    console.log(following_users)


    // useEffect(() => {
    //     dispatch(getPosts())
    // })


    return (
        <h1>Profiles</h1>
    )
}

export default Profiles
