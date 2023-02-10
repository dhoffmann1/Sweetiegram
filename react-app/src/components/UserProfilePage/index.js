import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getUserPosts } from "../../store/post"
import { getUserDetail } from "../../store/user"
import { createFollowingsThunk, getFollowings, deleteFollowingsThunk } from '../../store/following'
import { NavLink } from "react-router-dom"
import React from 'react'
// import './UserProfilePage.css'
import '../YourProfilePage/YourProfilePage.css'
import { resetFollowings } from '../../store/following'
import { resetUserPosts } from '../../store/user'
import PostDetailsModal from '../PostDetailsModal'
import cake1 from "../../images/cake1.png"

const UserProfilePage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { userId } = useParams();
    // console.log(userId)
    const [showPostDetailsModal, setShowPostDetailsModal] = useState(false)
    const [postToShowInModal, setPostToShowInModal] = useState(null)

    let posts = useSelector(state => Object.values(state.posts))
    const currentUser = useSelector(state => state.session.user)
    const user = useSelector(state => state.users.user)
    // console.log(user)
    const followings = useSelector(state => Object.values(state.followings))

    const [forceRender, setForceRender] = useState(false)
    posts = posts.filter(post => post?.ownerId === user?.id)

    // console.log('followings:', followings)
    // print('user id:', userId)
    // get user id from posts response from db
    // const user = posts[0]?.user

    // console.log("current user logged in:", currentUser)
    // console.log('SEARCHED user obj:', user)
    // console.log('POSTS:', posts)

    // const handleOpenPost = (e, post) => {
    //     setPostToShowInModal(post)
    //     setShowPostDetailsModal(true)
    // }

    let is_following = user?.followers.includes(currentUser?.id)
    // console.log('profile pic url:', user.profilePicUrl)
    useEffect(() => {
        setTimeout(() => {
            dispatch(getUserPosts(userId))
        }, 2)
        return () => resetUserPosts()
    }, [dispatch, forceRender, userId, is_following])

    // TODO: how to stop someone from sending a bad url request (eg. with ID?)
    useEffect(() => {
        setTimeout(() => {
            dispatch(getUserDetail(userId))
                .then(res => {

                    if (res.status >= 400 && res.status < 600) return Promise.reject(res)
                })
                .catch(async (res) => {

                    history.push('/unknown')
                    return
                });
        }, 2)
    }, [dispatch, forceRender, userId, is_following])

    useEffect(() => {
        setTimeout(() => {
            dispatch(getFollowings(userId))
        }, 2)
        return () => resetFollowings()
    }, [dispatch, forceRender, userId, is_following])

    // let following_id;
    // if (user) {
    //     following_id = currentUser.users_following.find(id => id == user.id)
    // }
    // // if not found => undefined
    // if (following_id) is_following = true

    return (
        <>
            {user && (
                <div className="profile-page-main-container">
                    <div className="first-profile-container">
                        <div className="profile-pic-box">
                            <img onError={e=> e.currentTarget.src = "https://www.seekpng.com/png/detail/41-410093_circled-user-icon-user-profile-icon-png.png"} className="profile-page-profile-pic" src={user.profilePicUrl} alt="profile" />
                        </div>
                        <div className='profile-text-box'>
                            <div className='username-box profile-page-text-row' id='profile-page-username-follow-button-container'>
                                <h3 className="username-title">{user.username}</h3>
                                {!is_following && currentUser.id !== user.id && <div id="profile-follow-button" onClick={() => {
                                    dispatch(createFollowingsThunk(user.id))
                                    setForceRender(!forceRender)
                                }}>Follow</div>}
                                {is_following && currentUser.id !== user.id && <div id="profile-unfollow-button" onClick={() => {
                                    dispatch(deleteFollowingsThunk(user.id))
                                    setForceRender(!forceRender)
                                }}>Unfollow</div>}

                                {/* <div style={{ marginLeft: "8px", border: "1px solid #DBDBDB", borderRadius: "3px", display: "flex", alignItems: "center" }}>Edit profile</div> */}
                                {/* <svg style={{ marginLeft: "8px" }} aria-label="Options" class="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" stroke-linecap="round" strokeLinejoin="round" strokeWidth="2"></circle><path d="M14.232 3.656a1.269 1.269 0 01-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 01-.796.66m-.001 16.688a1.269 1.269 0 01.796.66l.505.996h1.862l.505-.996a1.269 1.269 0 01.796-.66M3.656 9.768a1.269 1.269 0 01-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 01.66.796m16.688-.001a1.269 1.269 0 01.66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 01-.66-.796M7.678 4.522a1.269 1.269 0 01-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 01-.096 1.03m11.8 11.799a1.269 1.269 0 011.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 01.096-1.03m-14.956.001a1.269 1.269 0 01.096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 011.03.096m11.799-11.8a1.269 1.269 0 01-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 01-1.03-.096" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg> */}

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
                                {followings.map(user => (
                                    <div key={user.id}>
                                        <NavLink className='navlinks' exact to={`/users/${user.id}`}>
                                            <div className='user-following-profile-link-container'>
                                                {user && (<img className="user-following-profile-pic" src={user.profilePicUrl} alt="profile" />)}
                                                <p className="user-following-full-name"><b>{user.firstName} {user.lastName}</b></p>
                                            </div>
                                        </NavLink>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="third-profile-container">
                        <div className='posts-saved-container'>
                            <div className='posts-saved-button'>
                                <svg aria-label="" class="_ab6-" color="#262626" fill="#262626" height="12" role="img" viewBox="0 0 24 24" width="12"><rect fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="18" x="3" y="3"></rect><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="9.015" x2="9.015" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="14.985" x2="14.985" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="9.015" y2="9.015"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="14.985" y2="14.985"></line></svg>
                                <p style={{ marginLeft: "3px" }}>POSTS</p>
                            </div>
                            {/* <div className='posts-saved-button'>
                                <svg aria-label="" class="_ab6-" color="#8e8e8e" fill="#8e8e8e" height="12" role="img" viewBox="0 0 24 24" width="12"><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon></svg>
                                <p style={{ marginLeft: "3px" }}>SAVED</p>
                            </div> */}
                        </div>
                    </div>
                    {/* grid container below */}
                    {posts.length > 0 && (is_following || currentUser.id === user.id) && (
                        <div className="four-profile-container">
                            {
                                posts.map(post => (
                                    // console.log(post.ownerId)
                                    // console.log(user.id)
                                    // {post.ownerId === user.id && (
                                    <div key={post.id} className="post-image-card-container"
                                        onClick={() => {
                                            setPostToShowInModal(post);
                                            setShowPostDetailsModal(true);
                                        }}>
                                        <img onError={e=> e.currentTarget.src = cake1 } className='profile-post-image-pic' src={post.postUrl} alt="post" />
                                    </div>
                                    // }
                                ))
                            }
                        </div>
                    )}
                    {showPostDetailsModal && <PostDetailsModal setShowPostDetailsModal={setShowPostDetailsModal} post={postToShowInModal} />}
                    {posts.length <= 0 && (is_following || currentUser.id === user.id) && (
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
                    {!is_following && currentUser.id !== user.id && (
                        <h3> Follow this user to see their posts!</h3>
                    )}
                </div>

            )}

        </>
    )
}

export default UserProfilePage
