import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createPost } from '../../store/post';
import MyDropzone from '../CreatePostDropzone';
import "./PostForm.css"
import UploadPicture from '../aws_upload';

const PostForm = ({ setPostFormModal, post }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const [formStep, setFormStep] = useState(0)
    const [postUrl, setPostUrl] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [caption, setCaption] = useState('')
    const [errors, setErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [preview, setPreview] = useState('')
    const [imageType, setImageType] = useState(false)
    console.log("post url:", postUrl)

    useEffect(()=>{
        let errors=[]
        if (!isImage(imageType)) errors.push("Image post url is not valid")
        if (caption.length>500) errors.push("Caption must be no longer than 500 characters")
        setErrors(errors)

    }, [postUrl, caption])


    let shareButton = (
        <button form='create-post-actual-form' style={{ fontSize: '14px', boxSizing: "border-box", color: "#39B5F9", backgroundColor: 'white', border: 'none' }} type="submit" className="create-post-submit-button">
            Share
        </button>
    )

    // const onImageChange = event => {
    //     setPostUrl(event.target.value)
    // }


    // function isImage(url) {
    //   return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    // }

    const isImage = (contentType) => {
      let validEx = ["image/gif", "image/jpeg", "image/png", "image/tiff"]
      if (validEx.includes(contentType)) return true
      else return false
    }


    const handleSubmit = e => {
      e.preventDefault();
      setHasSubmitted(true)
      if (errors.length>0){
          alert('Cannot submit post')
          return
      }
    //   console.log("post urll:", postUrl)
    //   console.log("image type: ", imageType)
      post = {
          ...post,
          post_url: postUrl,
          city,
          state,
          country,
          caption
      }
      dispatch(createPost(post)).then(()=> setPostFormModal(false))
      alert('Post successfully created!')
      setHasSubmitted(false)
      return
    }

    return (
        <>
            <div className='create-post-title'>
                {formStep === 0 && postUrl && (
                    <button style={{ fontSize: '14px', color: "#39B5F9", backgroundColor: 'white', border: 'none' }} className="create-post-next-button" onClick={e => setFormStep(prev => prev + 1)} type='button'>Next</button>
                )}
                {formStep === 1 && (
                    <button style={{ boxSizing: "border-box", backgroundColor: 'white', border: 'none' }} type='button' className="create-post-back-button" onClick={e => setFormStep(prev => prev - 1)}>
                        <svg aria-label="Back" class="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="2.909" x2="22.001" y1="12.004" y2="12.004"></line><polyline fill="none" points="9.276 4.726 2.001 12.004 9.276 19.274" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polyline></svg>
                    </button>
                )}
                <div style={{fontSize: '16px', fontFamily: "Montserrat", fontWeight: "600"}}>Create new post</div>
                {formStep === 1 && shareButton}
            </div>
            {/* <div className='create-post-outer-form-container'> */}
                <form id='create-post-actual-form' className="create-post-form-outer-container" onSubmit={handleSubmit} >
                    {formStep === 0 && (
                      <>
                        <div className='create-form-post-url-main-container'>
                          <MyDropzone postUrl={postUrl} setPostUrl={setPostUrl} setImageType={setImageType}/>
                        </div>
                      </>
                    )}
                    {formStep === 1 && postUrl && (
                        <div className='form-step-1-main-content-container'>
                            <div className='create-post-image-left-container'>
                                <img className='create-post-left-pic' src={postUrl} alt="create-post-left-pic" />
                            </div>
                            <div className='create-post-form'>
                                {formStep === 1 && (
                                    <div className='create-post-form-profile-box'>
                                        <div className='create-post-form-profile-image-container'>
                                            <img src={sessionUser.profilePicUrl} className='create-post-form-profile-pic' alt="profile-pic" />
                                        </div>
                                        <div className='create-post-form-username-text'>
                                            {sessionUser.username}
                                        </div>
                                    </div>
                                )}
                                <input
                                    id='create-post-caption-input'
                                    type='textarea'
                                    value={caption}
                                    placeholder="Write a Caption..."
                                    onChange={e => setCaption(e.target.value)}
                                    style={{ height: "160px", display: "flex", marginTop: "0px", alignItems: "flex-start", textAlign: "left", verticalAlign: "text-top" }}
                                    className='create-post-input-field'
                                />
                                {/* either video input or text input; do conditional for image or video */}
                                <input
                                    type='text'
                                    value={city}
                                    placeholder='City (Optional)'
                                    onChange={e => setCity(e.target.value)}
                                    className='create-post-input-field'
                                />
                                <input
                                    type='text'
                                    value={state}
                                    placeholder="State (Optional)"
                                    onChange={e => setState(e.target.value)}
                                    className='create-post-input-field'
                                />
                                <input
                                    type='text'
                                    value={country}
                                    placeholder="Country (Optional)"
                                    onChange={e => setCountry(e.target.value)}
                                    className='create-post-input-field'
                                />
                                {errors.length > 0 && hasSubmitted && (
                                    <div className="validation-errors-container">
                                        <ul className='validation-errors'>
                                            {errors.map((error, idx) => (
                                                <li key={idx}>{error}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                    )}
                </form>
            {/* </div> */}
        </>
    )
}

export default PostForm
