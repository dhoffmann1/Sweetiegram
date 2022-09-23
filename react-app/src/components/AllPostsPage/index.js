import {NavLink} from "react-router-dom"
import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useState, useEffect} from 'react'
// import { getAllPosts } from "../../store/post"
import { getAllUsers } from "../../store/user"
import "./AllPostsPage.css"

const AllPostsPage = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => Object.values(state.users))
    console.log('all users', users)
    useEffect(()=> {
        dispatch(getAllUsers())
    }, [dispatch])

    // const allPosts = posts.map((post)=>)

    return (
        <>
            <div className="all-posts-main-container">
                <div className='all-posts-main-grid-container'>
                    {users.length>0 && users.map(user=> (
                            <NavLink className='all-posts-navlink' to={user? `/users/${user.id}` : '/allposts'}>
                                <div className='all-posts-post-container'>
                                    <div className='all-posts-user-profile-pic-container'>
                                        <img className='all-posts-user-profile-pic'src={user?.profilePicUrl}/>
                                    </div>
                                    <div>
                                        <p> {user?.username}</p>
                                        <p>{user?.firstName} {user?.lastName}</p>
                                    </div>
                                </div>
                            </NavLink>
                    ))}
                </div>
            </div>

        </>
    )
}

export default AllPostsPage
