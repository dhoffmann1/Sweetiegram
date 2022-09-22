import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { NavLink } from "react-router-dom"
import { getFollowings } from '../../store/following'
import React from 'react'

const Profiles = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const followings = useSelector(state => Object.values(state.followings))
    // console.log(sessionUser)

    useEffect(() => {
        dispatch(getFollowings(sessionUser.id))
    }, [dispatch])


    let storiesBar = followings.map((followers) => {
        if (followers <= 0) return null
        const { profilePicUrl, username } = followers

        let storiesUsername
        let maxUsername
        if (username.length > 10) {
            maxUsername = username.slice(0, 10) + '..'

            storiesUsername = (
                <>
                    {maxUsername}
                </>
            )
        } else {
            storiesUsername = (
                <>
                    {username}
                </>
            )
        }
        console.log(maxUsername)
        return (
            <div className='storiesBar-profile'>
                <div className='storiesBar-profile-container'>
                    <img src={profilePicUrl} className='storiesBar-profile-pic'></img>
                </div>
                <div className='storiesBar-username'>
                    {storiesUsername}
                </div>
            </div>
        )

    })


    return (
        <>
            {storiesBar}
        </>
    )
}

export default Profiles
