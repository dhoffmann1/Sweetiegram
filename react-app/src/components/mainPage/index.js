import './main.css'
import Posts from '../Posts/index'
import Profiles from '../profiles/index'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { getPosts } from "../../store/post"
import { NavLink } from "react-router-dom"
import React from 'react'

function MainPage() {

    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts)
    console.log(posts)


    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])




    return (
        <>
            <div className='whole-page'>
                <div className="container-page">
                    <div className="left-main">
                        <div className="storiesbox">
                            {Profiles()}
                        </div>
                        <div className="postsbox">
                            {Posts()}
                        </div>

                    </div>
                    <div className="right-main">
                        <h1> profile button + more</h1>
                    </div>

                </div>
            </div>
        </>
    )



}

export default MainPage
