import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getYourPosts } from "../../store/post"
import { getFollowings } from '../../store/following'
import React from 'react'
import './YourProfilePage.css'
import { resetFollowings } from '../../store/following'
import { resetPosts } from '../../store/post'
import cake1 from "../../images/cake1.png"

const YourProfilePage = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => Object.values(state.posts))
    const user = useSelector(state => state.session.user)
    const followings = useSelector(state => Object.values(state.followings))


    useEffect(() => {
        dispatch(getYourPosts())
        return () => resetPosts()
    }, [dispatch])

    useEffect(() => {
        // for (let i = 0; i< user.users_following.length; i++){
        //     dispatch(getFollowings(user.users_following[i]))
        // }
        dispatch(getFollowings(user.id))
        return () => resetFollowings()
    }, [dispatch, user])


    return (
        <>
            <div className="profile-page-main-container">
                <div className="first-profile-container">
                    <div className="profile-pic-box">
                        <img className="profile-page-profile-pic" src={user.profilePicUrl} alt="profile" />
                    </div>
                    <div className='profile-text-box'>
                        <div className='username-box profile-page-text-row'>
                            <h3 className="username-title">{user.username}</h3>
                            <div style={{ marginLeft: "8px", border: "1px solid #DBDBDB", borderRadius: "3px", display: "flex", alignItems: "center" }}>Edit profile</div>
                            <svg style={{ marginLeft: "8px" }} aria-label="Options" class="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle><path d="M14.232 3.656a1.269 1.269 0 01-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 01-.796.66m-.001 16.688a1.269 1.269 0 01.796.66l.505.996h1.862l.505-.996a1.269 1.269 0 01.796-.66M3.656 9.768a1.269 1.269 0 01-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 01.66.796m16.688-.001a1.269 1.269 0 01.66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 01-.66-.796M7.678 4.522a1.269 1.269 0 01-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 01-.096 1.03m11.8 11.799a1.269 1.269 0 011.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 01.096-1.03m-14.956.001a1.269 1.269 0 01.096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 011.03.096m11.799-11.8a1.269 1.269 0 01-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 01-1.03-.096" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>

                        </div>
                        <div className='posts-follows-following-box profile-page-text-row'>
                            <div><b>{user.numPosts}</b> Posts</div>
                            <div style={{ marginLeft: "30px" }}><b>{user.numFollowers}</b> Followers</div>
                            <div style={{ marginLeft: "30px" }}><b>{user.numFollowing}</b> Following</div>
                        </div>
                        <div className='firstname-lastname-box profile-page-text-row'>
                            <h3>{user.firstName} {user.lastName}</h3>
                        </div>
                    </div>
                </div>
                {followings.length > 0 && (
                    <div className='second-profile-container'>
                        <div className='users-following-links-box'>
                            {followings.length > 0 && followings.map(user => (
                                <div className='user-following-profile-link-container'>
                                    {user && (<img className="user-following-profile-pic" onError={e=> { e.currentTarget.src = "https://www.seekpng.com/png/detail/41-410093_circled-user-icon-user-profile-icon-png.png"; }} src={user.profilePicUrl} alt="profile" />)}
                                    <p className="user-following-full-name"><b>{user.firstName} {user.lastName}</b></p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <div className="third-profile-container">
                    <div className='posts-saved-container'>
                        <div className='posts-saved-button'>
                            <svg aria-label="" class="_ab6-" color="#262626" fill="#262626" height="12" role="img" viewBox="0 0 24 24" width="12"><rect fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" width="18" x="3" y="3"></rect><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="9.015" x2="9.015" y1="3" y2="21"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="14.985" x2="14.985" y1="3" y2="21"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="9.015" y2="9.015"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="14.985" y2="14.985"></line></svg>
                            <p style={{ marginLeft: "3px" }}>POSTS</p>
                        </div>
                        <div className='posts-saved-button'>
                            <svg aria-label="" class="_ab6-" color="#8e8e8e" fill="#8e8e8e" height="12" role="img" viewBox="0 0 24 24" width="12"><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg>
                            <p style={{ marginLeft: "3px" }}>SAVED</p>
                        </div>
                    </div>
                </div>
                {/* grid container below */}
                {posts.length > 0 ? (
                    <div className="four-profile-container">
                        {
                            posts.map(post => (
                                <div className="post-image-card-container">
                                    <img onError={e=> e.currentTarget.src = cake1 } className='profile-post-image-pic' src={post.postUrl} alt="post" />
                                </div>
                            ))
                        }
                    </div>

                ) : (
                    <div className='no-posts-message-container'>
                        <div className="no-posts-top-row">
                            <div className='no-posts-camera-icon-container'>
                                <i class="fa-solid fa-camera"></i>
                            </div>
                        </div>
                        <div className='no-posts-bottom-row'>
                            <p style={{ fontSize: "24px" }}>No posts yet</p>
                        </div>
                    </div>
                )}
            </div>


        </>
    )
}

export default YourProfilePage
