import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { NavLink } from "react-router-dom"
import { getFollowings } from '../../store/following'
import React from 'react'
import './profile.css'

const Profiles = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const followings = useSelector(state => Object.values(state.followings))
    // console.log(followings)

    useEffect(() => {
        dispatch(getFollowings(sessionUser.id))
    }, [dispatch, sessionUser.id])


    let storiesBar = followings.map((followers) => {
        if (followers <= 0) return null
        const { profilePicUrl, username, id } = followers



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

        return (
                <div className='storiesBar-profile' key={id}>
                    <NavLink to={`/users/${id}`}>
                        <div className='storiesBar-profile-container'>
                            <img src={profilePicUrl} className='storiesBar-profile-pic' alt="profiles" ></img>
                        </div>
                    </NavLink>
                    <div className='storiesBar-username'>
                        {storiesUsername}
                    </div>
                </div>
        )

    })

    if (followings.length <= 0) {
        return (
            <></>
        )
    } else {

        return (
            <div className='storiesbox'>
                {storiesBar}
            </div>
        )
    }
}

export default Profiles
