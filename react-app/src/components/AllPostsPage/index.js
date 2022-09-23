import {NavLink} from "react-router-dom"
import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useState, useEffect} from 'react'
import { getAllPosts } from "../../store/post"
import "./AllPostsPage.css"

const AllPostsPage = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => Object.values(state.posts))
    console.log('all posts:', posts)
    useEffect(()=> {
        dispatch(getAllPosts())
    }, [dispatch])

    // const allPosts = posts.map((post)=>)

    return (
        <>
            <h3>All Posts </h3>
            <div className="all-posts-main-container">
                <div className='all-posts-main-grid-container'>
                    {posts.length>0 && posts.map(post=> (
                        <div className='all-posts-post-container'>
                            <img className='all-posts-user-profile-pic'src={post.postUrl}/>
                            <p> {post.user.username}</p>
                            <p>{post.user.firstName} {post.user.lastName}</p>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}

export default AllPostsPage
