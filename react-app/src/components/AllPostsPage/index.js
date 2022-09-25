import { NavLink } from "react-router-dom"
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
// import { getAllPosts } from "../../store/post"
import { getAllUsers } from "../../store/user"
import "./AllPostsPage.css"

const AllPostsPage = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => Object.values(state.users))
    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    const allPostsMenu = users.map(user => {
        if (!user) return null
        const { username, firstName, lastName, profilePicUrl, id } = user


        let maxUsernNameLength
        if (username.length > 16) {

            maxUsernNameLength = (
                <div className="allposts-username">
                    {username.slice(0, 15) + '..'}
                </div>
            )
        } else {
            maxUsernNameLength = (
                <div className="allposts-username">
                    {username}
                </div>
            )
        }




        let maxFullNameLength
        let fullname = firstName + lastName
        if (fullname.length > 24) {
            maxFullNameLength = (
                <div className="allposts-fullname">
                    {fullname.slice(0, 24) + ".."}
                </div>
            )
        } else {
            maxFullNameLength = (
                <div className="allposts-fullname">
                    {firstName} {lastName}
                </div>
            )
        }


        return (
            <>
                <NavLink className='all-posts-navlink' to={user ? `/users/${id}` : '/unknown'}>
                    <div className='all-posts-post-container'>
                        <div className='all-posts-user-profile-pic-container'>
                            <img className='all-posts-user-profile-pic' src={profilePicUrl} />
                        </div>
                        <div className="allposts-name-container">
                            {maxUsernNameLength}
                            {maxFullNameLength}
                        </div>
                    </div>
                </NavLink>
            </>
        )
    })



    return (
        <>
            {/* <div style={{ display: 'flex', flexDirection: "column" }}> */}
            <h1 style={{ marginLeft: '5%' }}> Here are some suggested users: </h1>
            <div className="all-posts-main-container">
                <div className='all-posts-main-grid-container'>
                    {users.length > 0 && allPostsMenu}
                </div>
            </div>
            {/* </div> */}
        </>
    )
}

export default AllPostsPage
