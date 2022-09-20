import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { getPosts } from "../../store/post"
import { NavLink } from "react-router-dom"
import React from 'react'
import './Posts.css'


const Posts = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => Object.values(state.posts))
    console.log(posts)


    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])


    const allPosts = posts.map((post) => {
        if (!post) return null
        const { caption, comments, numLikes, postUrl, user } = post
        let postHeader = (

            <div className='mainpage-post-header'>
                <div className='image-container'>
                    <img src={user.profilePicUrl} className='mainpage-profile-pic'></img>
                </div>
                <div className='mainpage-username'>
                    {user.username}
                </div>
            </div>

        )

        let body = (
            <>
                <img src={postUrl} className='mainpage-body-image'></img>
            </>
        )

        let commentsLink
        if (comments.length >= 2) {
            commentsLink = (
                // Going to add an onclick that directs to the profile id of that post
                <div>
                    View all {comments.length} comments
                </div>
            )
        } else if (comments.length === 1) {
            commentsLink = (
                // Going to add an onclick that directs to the profile id of that post
                <div>
                    View {comments.length} comment
                </div>
            )
        } else {
            commentsLink = (
                <div>
                    0 comments
                </div>
            )
        }


        let userInterface = (
            <>
                <div className='mainpage-posts-icons'>
                    <div style={{ marginRight: '15px' }} className="mainpage-interface-icons">
                        <i class="fa-regular fa-heart"></i>
                    </div>
                    <div className="mainpage-interface-icons">
                        <i class="fa-regular fa-comment fa-flip-horizontal"></i>
                    </div>
                </div>
                <div className='mainpage-posts-likes'>
                    {numLikes} likes
                </div>
                <div className='mainpage-posts-bio'>
                    <div className='mainpage-posts-bio-username'>
                        {user.username}
                    </div>
                    <div className='mainpage-posts-bio-caption'>
                        {caption}
                    </div>
                </div>
                <div className='mainpage-comments-placeholder'>
                    {commentsLink}
                </div>
            </>

        )


        return (
            <div className='postsbox'>
                <div>
                    {postHeader}
                </div>
                <div className='mainpage-body-image-container'>
                    {body}
                </div>
                <div className='mainpage-interface-div'>
                    {userInterface}
                </div>
            </div>
        )

    })

    return (
        <>
            {allPosts}
        </>
    )
}

export default Posts
