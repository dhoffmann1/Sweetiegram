import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './PostDetails.css';

function PostDetails({ setShowPostDetailsModal, post }) {
  console.log('post in line7 of PostDetails file', post)
  const { caption, comments, numLikes, postUrl, user, createdAt } = post
  return (
      <div id="post-details-overall-container">
        <div id="post-details-main-grid">
          <div id="post-details-left-main-container">
            <div id="post-details-image-container">
              <img id="post-details-post-image" src={postUrl} alt="post image"/>
            </div>
          </div>
          <div id="post-details-right-main-container">
            <div id="post-details-right-grid">
              <div id="post-details-owner-info-container">
                <div id="post-details-owner-info-grid">
                  <div id="post-details-owner-info-pic-username-container">
                    <div id="post-details-owner-info-profile-pic-container">
                      <img id="post-details-owner-info-profile-image" src={user.profilePicUrl} alt="post owner pic" />
                    </div>
                    <div id="post-details-owner-info-username">{user.username}</div>
                  </div>
                  <div id="post-details-owner-info-three-dots">
                    <i class="fa-solid fa-ellipsis"></i>
                  </div>
                </div>
              </div>
              {/* <div id="post-details-caption-section">
                <div id="post-details-caption-section-grid"></div>
              </div> */}
              <div id="post-details-comment-component-section">
                insert comments component from Ladan
              </div>
              <div id="post-details-liked-section">
                <div className='mainpage-posts-icons'>
                    <div style={{ marginRight: '15px' }} className="mainpage-interface-icons">
                        <i id="heart-icon" class="fa-regular fa-heart"></i>
                    </div>
                    <div className="mainpage-interface-icons">
                        <i id="new-comment-icon" class="fa-regular fa-comment fa-flip-horizontal"></i>
                    </div>
                </div>
                <div id="post-details-likes-number-section">
                  <div id="post-details-numlikes">{numLikes} likes</div>
                  {/* <div id="post-details-created-at">{createdAt}</div> */}
                </div>
              </div>
              <div id="post-details-comments-form-section">
                {/* <div className='comment-form-line'></div> */}
                <div className='comment-post-form'>
                    <div>
                        Add a comment...
                    </div>
                    <div >
                        <button className='comment-post-button'>Post</button>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );



}

export default PostDetails
