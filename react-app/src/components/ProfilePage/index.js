import {useDispatch, useSelector} from 'react-redux'
import {useState, useEffect} from 'react'
import {getUserPosts} from "../../store/post"
import { getFollowings } from '../../store/following'
import {NavLink} from "react-router-dom"
import React from 'react'
import './ProfilePage.css'


const ProfilePage = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => Object.values(state.posts))
    const user = useSelector(state=> state.session.user)
    const followings = useSelector(state => Object.values(state.followings))
    console.log('user obj:', user)
    console.log('followings:', followings)

    useEffect(()=>{
        dispatch(getUserPosts())

    }, [dispatch])

    useEffect(()=>{
        // for (let i = 0; i< user.users_following.length; i++){
        //     dispatch(getFollowings(user.users_following[i]))
        // }
        dispatch(getFollowings(user.id))
    }, [dispatch, user])


    return (
        <>
            <div className="profile-page-main-container">
                <div className="first-profile-container">
                    <div className="profile-pic-box">
                        <img className="profile-page-profile-pic" src={user.profilePicUrl}/>
                    </div>
                    <div className='profile-text-box'>
                        <div className='username-box profile-page-text-row'>
                            <h3 className="username-title">{user.username}</h3>
                        </div>
                        <div className='posts-follows-following-box profile-page-text-row'>
                            <div>{user.numPosts} Posts</div>
                            <div>{user.numFollowers} Followers</div>
                            <div>{user.numFollowing} Following</div>
                        </div>
                        <div className='firstname-lastname-box profile-page-text-row'>
                            <h3>{user.firstName} {user.lastName}</h3>
                        </div>
                    </div>
                </div>
                <div className='second-profile-container'>
                    <div className='users-following-links-box'>
                        {followings.length>0 && followings.map(user=> (
                            <div className='user-following-profile-link-container'>
                                <img className="user-following-profile-pic" src={user.profilePicUrl}/>
                                <p className="user-following-full-name">{user.firstName} {user.lastName}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="third-profile-container">
                    <div className='posts-saved-container'>
                            <div className='posts-saved-button'>
                                <i class="fa-solid fa-star"></i>
                                <p>POSTS</p>
                            </div>
                            <div className='posts-saved-button'>
                                <i class="fa-solid fa-star"></i>
                                <p>SAVED</p>
                            </div>
                    </div>
                </div>
                {/* grid container below */}
                <div className= "four-profile-container">
                    {posts.length>0  && posts.map(post => (
                        <img src={post.postUrl}/>
                    )
                    )}
                </div>
                {/* <>
                            {
                                posts.map(post => (
                                    <img src= {post.postPicUrl}/>
                                ))
                            }
                        </> */}
            </div>
            {posts.length>0 && posts.map(post =>(
                <p>{post.caption}</p>
            ))}

        </>
    )
}

export default ProfilePage
