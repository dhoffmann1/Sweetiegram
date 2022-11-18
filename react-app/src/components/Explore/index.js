import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from '../../store/post';
import PostDetailsModal from '../PostDetailsModal';
import "./Explore.css"

const ExplorePage = () => {
  const dispatch = useDispatch();
  let posts = useSelector(state=> Object.values(state.posts))
  const [postModal, setPostModal]= useState(false);
  const [postObj, setPostObj] = useState(null)

  useEffect(()=> {
    dispatch(getAllPosts())
  }, [])

  return (
    <div className='explore-page-main-grid-container'>
      {posts.length>0 && posts.map((post,i) => (
        <div onClick={()=>{
          setPostObj(post);
          setPostModal(true);
        }} key={post.id} className={`explore-page-post-card ${i} ${String(i)[String(i).length - 1]==0 ? "bigger-box-1": String(i)[String(i).length - 1]==6? "bigger-box-2" : 'regular'}`} >
          <div className="explore-page-img-wrapper">
            <img className='explore-page-img' src= {post.postUrl}/>
          </div>
          <div className='explore-page-hover-display'>
            <div className='explore-page-hover-display-content-container'>
              <div className='explore-page-likes-container img-info-container'>
                <svg aria-label="Notifications" class="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
                {post.numLikes}
              </div>
              <div className='explore-page-comments-container img-info-container'>
                <svg aria-label="Comment" class="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
                {post.comments.length}
              </div>
            </div>
          </div>
        </div>
      ))}
      {postModal && <PostDetailsModal setShowPostDetailsModal={setPostModal} post={postObj}/>}
    </div>
  )
}

export default ExplorePage
