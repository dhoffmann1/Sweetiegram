import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createPost } from '../../store/post';
import "./PostForm.css"

const PostForm = ({setPostFormModal, post}) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const [formStep, setFormStep]= useState(0)
    const [postUrl, setPostUrl] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [caption, setCaption] = useState('')
    const [errors, setErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)

    // const [isVideo, setVideo] = useState(false)


    useEffect(()=>{
        let errors=[]
        if (!isImage(postUrl)) errors.push("Image post url is not valid")
        if (caption.length>500) errors.push("Caption must be no longer than 500 characters")
        setErrors(errors)

    }, [postUrl, caption])

    // useEffect(()=> {
    //     let errors = []
    //     if (postUrlErrors.length == 0 && captionErrors.length ==0){

    //     }
    // }, [caption])
    let shareButton = (
        <button form='create-post-actual-form' style={{fontSize:'14px', boxSizing: "border-box", color:"#39B5F9", backgroundColor:'white', border:'none'}} type="submit" className="create-post-submit-button">
            Share
        </button>
    )

    const onImageChange = event => {
        // if (event.target.files && event.target.files[0]) {
        //   setPostUrl(URL.createObjectURL(event.target.files[0]));
        // }
        setPostUrl(event.target.value)
    }
    function isImage(url) {
        return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    }

    // async function checkImage(url){

    //     const res = await fetch(url);
    //     const buff = await res.blob();

    //     return buff.type.startsWith('image/')
    // }

    // function checkImage(url) {
    //     let request = new XMLHttpRequest();
    //     request.open("GET", url, true);
    //     request.send();
    //     request.onload = function() {
    //       let status = request.status;
    //       if (request.status == 200) //if(statusText == OK)
    //       {
    //
    //       } else {
    //
    //       }
    //     }
    //   }


    const handleSubmit = e => {
        e.preventDefault();
        setHasSubmitted(true)
        if (errors.length>0){
            alert('Cannot submit post')
            return
        }
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
                    <button style={{fontSize:'14px',color:"#39B5F9", backgroundColor:'white', border:'none'}} className="create-post-next-button" onClick={e=> setFormStep(prev=> prev+1)} type='button'>Next</button>
                )}
                {formStep === 1 && (
                    <button style={{boxSizing: "border-box", backgroundColor:'white', border:'none'}} type='button' className="create-post-back-button" onClick={e =>setFormStep(prev=> prev - 1)}>
                        <svg aria-label="Back" class="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="2.909" x2="22.001" y1="12.004" y2="12.004"></line><polyline fill="none" points="9.276 4.726 2.001 12.004 9.276 19.274" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline></svg>
                    </button>
                )}
                <h3>Create new post</h3>
                {formStep === 1 && shareButton}
            </div>
            <div className='create-post-outer-form-container'>
                <form id='create-post-actual-form' className="create-post-form-outer-container" onSubmit={handleSubmit} >
                    {formStep === 0 && (
                        <>
                            <div className ='create-form-post-url-main-container'>
                                <input
                                    type='text'
                                    onChange={onImageChange}
                                    placeholder="Post url"
                                    style={{color:"black", border: "3px solid #E38B29", backgroundColor:"#FECD70", height:"6%",boxSizing: "border-box", width: "100%"}}
                                />
                                {/* <input type="file" onChange={onImageChange} className="create-post-filetype" /> */}
                                <img className='create-form-post-preview-image' src={postUrl? postUrl: null} alt="preview" />
                            </div>
                        </>
                    )}
                    {formStep === 1 && postUrl && (
                        <div className='form-step-1-main-content-container'>
                            <div className='create-post-image-left-container'>
                                <img className='create-post-left-pic'src={postUrl} alt="create-post-left-pic" />
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
                                    value = {caption}
                                    placeholder = "Write a Caption..."
                                    onChange= {e=> setCaption(e.target.value)}
                                    style={{height:"160px", display:"flex", marginTop:"0px", alignItems:"flex-start", textAlign: "left", verticalAlign: "text-top" }}
                                    className='create-post-input-field'
                                    />
                                {/* either video input or text input; do conditional for image or video */}
                                <input
                                    type='text'
                                    value = {city}
                                    placeholder='City (Optional)'
                                    onChange= {e=> setCity(e.target.value)}
                                    className ='create-post-input-field'
                                />
                                <input
                                    type='text'
                                    value = {state}
                                    placeholder = "State (Optional)"
                                    onChange= {e=> setState(e.target.value)}
                                    className ='create-post-input-field'
                                />
                                <input
                                    type='text'
                                    value = {country}
                                    placeholder = "Country (Optional)"
                                    onChange= {e=> setCountry(e.target.value)}
                                    className ='create-post-input-field'
                                />
                                {errors.length>0 && hasSubmitted && (
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
            </div>
        </>
    )
}

export default PostForm
