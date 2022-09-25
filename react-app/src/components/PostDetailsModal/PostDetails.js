import React, { useEffect, useState } from "react";
import Comments from '../Comments'
import CommentForm from "../NewCommentForm";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getPosts, deletePost } from "../../store/post";
import { createLikesThunk, deleteLikesThunk } from "../../store/likes";
import './PostDetails.css';

function PostDetails({ setShowPostDetailsModal, post }) {
  const { numLikes, postUrl, user, likesUserId } = post
  const sessionUser = useSelector(state => state.session.user)
  const [showPostOptions, setShowPostOptions] = useState(false)
  const [likePost, setLikePost] = useState(likesUserId.includes(sessionUser.id))
  const [numberLikes, setNumberLikes] = useState(numLikes)
  const dispatch = useDispatch();

  const handleDelete = postId => {
    dispatch(deletePost(postId));
    setShowPostDetailsModal(false);
  }

  const likeFunc = () => {
    dispatch(createLikesThunk(post.id))
      .then(() => dispatch(getPosts()))
    setLikePost(!likePost)
    setNumberLikes(numberLikes+1)
  }

  const unlikeFunc = () => {
    dispatch(deleteLikesThunk(post.id))
      .then(() => dispatch(getPosts()))
    setLikePost(!likePost)
    setNumberLikes(numberLikes-1)
  }

  let likesComponent
  if (likePost) likesComponent = (<i class="fa-solid fa-heart" id='likesHeart' onClick={() => unlikeFunc()}></i>)
  else likesComponent = (<i class="fa-regular fa-heart" id="likes-heart-2" onClick={() => likeFunc()}></i>)

  useEffect(()=> {
    dispatch(getPosts())
  }, [dispatch, likePost, numberLikes])

  return (
      <div id="post-details-overall-container">
        <div id="post-details-main-grid">
          <div id="post-details-left-main-container">
            <div id="post-details-image-container">
              <img id="post-details-post-image" src={postUrl} alt="post"/>
            </div>
          </div>
          <div id="post-details-right-main-container">
            <div id="post-details-right-grid">
              <div id="post-details-owner-info-container">
                <div id="post-details-owner-info-grid">
                  <div id="post-details-owner-info-pic-username-edit-delete-container">
                    <div id="post-details-owner-info-pic-username-container">
                      <div id="post-details-owner-info-profile-pic-container">
                        <img id="post-details-owner-info-profile-image" src={user.profilePicUrl} alt="post owner pic" />
                      </div>
                      <NavLink onClick={() => setShowPostDetailsModal(false)} id="post-details-owner-info-username" to={`/users/${user.id}`}>{user.username}</NavLink>
                    </div>
                    {sessionUser.id === post.ownerId && showPostOptions && (
                    <div id='delete-edit-buttons-container'>
                      <NavLink id='post-details-edit-button' to={`/posts/${post.id}/edit`}>EDIT</NavLink>
                      <div id='post-details-delete-button' onClick={() => handleDelete(post.id)}>DELETE</div>
                    </div>
                    )}
                  </div>
                  {sessionUser.id === post.ownerId && (
                    <div id="post-details-owner-info-three-dots" onClick={() => setShowPostOptions(!showPostOptions)}>
                      <i class="fa-solid fa-ellipsis"></i>
                    </div>
                  )}
                </div>
              </div>
              <div id="post-details-comment-component-section">
                <Comments setShowPostDetailsModal={setShowPostDetailsModal} post={post}/>
              </div>
              <div id="post-details-liked-section">
                <div className='mainpage-posts-icons'>
                    <div style={{ marginRight: '15px' }} className="mainpage-interface-icons">
                        {likesComponent}
                    </div>
                    <div className="mainpage-interface-icons" onClick={() => document.getElementById("content-area-input-modal").focus()}>
                        <i id="new-comment-icon" class="fa-regular fa-comment fa-flip-horizontal"></i>
                    </div>
                </div>
                <div id="post-details-likes-number-section">
                  <div id="post-details-numlikes">{numberLikes} likes</div>
                </div>
              </div>
              <div id="post-details-comments-form-section">
                <CommentForm postId={post.id} modal={true}/>
              </div>
            </div>
          </div>
        </div>
      </div>
  );



}

export default PostDetails
