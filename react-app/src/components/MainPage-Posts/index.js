import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { getPosts } from "../../store/post"
import { NavLink } from "react-router-dom"
import React from 'react'
import './MainPagePosts.css'
import PostDetailsModal from '../PostDetailsModal'
import { createLikesThunk, deleteLikesThunk } from '../../store/likes'
import CommentForm from '../NewCommentForm';




const MainPagePosts = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const posts = useSelector(state => Object.values(state.posts))
    const [showPostDetailsModal, setShowPostDetailsModal] = useState(false)
    const [postToShowInModal, setPostToShowInModal] = useState(null)

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])

    const allPosts = posts.map((post) => {
        if (!post) return null
        const { id, caption, comments, numLikes, postUrl, user, createdAt, likesUserId } = post
        let postHeader = (

            <div className='mainpage-post-header'>
                <div className='image-container'>
                    <img onError={e=>  { e.currentTarget.src = "https://www.seekpng.com/png/detail/41-410093_circled-user-icon-user-profile-icon-png.png"; }} src={user.profilePicUrl} className='mainpage-profile-pic' alt="profile"></img>
                </div>
                <NavLink to={`/users/${user.id}`} className='mainpage-posts-navlink-profile'>
                    <div className='mainpage-username'>
                        {user.username}
                    </div>
                </NavLink>
            </div>

        )

        let body = (
            <>
                <img src={postUrl} onError={e=> {e.currentTarget.src =""; }} className='mainpage-body-image' alt="body"></img>
            </>
        )

        let commentsLink
        if (comments.length >= 2) {
            commentsLink = (
                // Going to add an onclick that directs to the profile id of that post
                <div onClick={() => {
                    setPostToShowInModal(post);
                    setShowPostDetailsModal(true);
                }}>
                    View all {comments.length} comments
                </div>
            )
        } else if (comments.length === 1) {
            commentsLink = (
                // Going to add an onclick that directs to the profile id of that post
                <div onClick={() => {
                    setPostToShowInModal(post);
                    setShowPostDetailsModal(true);
                }}>
                    View {comments.length} comment
                </div>
            )
        } else {
            commentsLink = (
                <div onClick={() => {
                    setPostToShowInModal(post);
                    setShowPostDetailsModal(true);
                }}>
                    0 comments
                </div>
            )
        }


        let likesComponent
        //user hasnt like the post
        if (likesUserId.includes(sessionUser.id)) {
            likesComponent = (
                <>
                    <i class="fa-solid fa-heart" id='likesHeart' onClick={() => { dispatch(deleteLikesThunk(id)).then(() => dispatch(getPosts())) }}></i>
                </>
            )

        } else {
            likesComponent = (
                <>
                    <i class="fa-regular fa-heart" id="unlikedHeart" onClick={() => { dispatch(createLikesThunk(id)).then(() => dispatch(getPosts())) }}></i>
                </>
            )
        }

        const datePosted = new Date(createdAt)
        const now = Date.now()
        const milliseconds = Math.abs(now - datePosted)
        const minutes = Math.ceil(milliseconds / (1000 * 60))
        const hours = Math.ceil(milliseconds / (1000 * 60 * 60))
        const days = Math.ceil(milliseconds / (1000 * 60 * 60 * 24))

        let postTimer
        if (minutes < 60) {
            postTimer = (
                <>
                    {minutes} minutes ago
                </>
            )
        } else if (hours < 24) {
            postTimer = (
                <>
                    {hours} hours ago
                </>
            )
        } else {
            postTimer = (
                <>
                    {days} days ago
                </>
            )
        }

        let userInterface = (
            <>
                <div className='mainpage-posts-icons'>
                    <div style={{ marginRight: '15px' }} className="mainpage-interface-icons">
                        {likesComponent}
                    </div>
                    <div className="mainpage-interface-icons" onClick={() => {
                        setPostToShowInModal(post)
                        setShowPostDetailsModal(true)
                    }}>
                        <i id="new-comment-icon-mainpage" class="fa-regular fa-comment fa-flip-horizontal"></i>
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
                <div className='mainpage-time'>
                    {postTimer}
                </div>
            </>

        )

        let commentForm = (
            <>
                <div className='comment-form-line'></div>
                <div className='comment-post-form'>
                    <CommentForm postId={post.id} />
                </div>
            </>

        )

        return (
            <div className='postsbox' key={post.id}>
                <div>
                    {postHeader}
                </div>
                <div className='mainpage-body-image-container'>
                    {body}
                </div>
                <div className='mainpage-interface-div'>
                    {userInterface}
                </div>
                <div className='mainpage-comment-form'>
                    {commentForm}
                </div>
            </div>
        )
    })

    return (
        <>
            {allPosts}
            {showPostDetailsModal && <PostDetailsModal setShowPostDetailsModal={setShowPostDetailsModal} post={postToShowInModal} />}
        </>
    )
}

export default MainPagePosts
