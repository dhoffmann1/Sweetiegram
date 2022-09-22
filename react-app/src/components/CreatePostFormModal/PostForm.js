import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import "./PostForm.css"

const PostForm = ({setPostFormModal}) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const [formStep, setFormStep]= useState(0)
    const [postUrl, setPostUrl] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [caption, setCaption] = useState('')
    const [errors, setErrors] = useState([])
    // optional: video or image type
    const [isImage,setIsImage] = useState(false)
    const [isVideo,setVideo] = useState(false)


    useEffect(()=>{
        let errors = []


    }, [postUrl, city, state, country, caption])

    const handleSubmit = e => {
        e.preventDefault();
        console.log('post form submitted')
        return
    }

    return (
        <>
            <div className='create-post-title'>
                <h3>Create new post</h3>
                <button type="submit" className="create-post-submit-button">Share</button>
            </div>
            <div className="create-post-form-outer-container">
                <div className='create-post-form-profile-box'>
                    <div className='create-post-form-profile-image-container'>
                        <img src={sessionUser.profilePicUrl} className='create-post-form-profile-pic'/>
                    </div>
                    <div className='create-post-form-username-text'>
                        {sessionUser.username}
                    </div>
                </div>
                <form className='create-post-form' onSubmit={handleSubmit} >
                    {formStep === 0 && (
                        <div className = 'create-form-post-url-main-container'>
                            <input
                                type='text'
                                value = {postUrl}
                                placeholder = 'Post Image Url'
                                onChange= {e=> setPostUrl(e.target.value)}
                                required
                                className ='create-post-input-field'
                            />
                        </div>
                    )}
                        <input
                            id='create-post-caption-input'
                            type='textarea'
                            value = {caption}
                            placeholder = "Write a Caption..."
                            onChange= {e=> setCaption(e.target.value)}
                            style={{height:"160px", display:"flex", marginTop:"0px", alignItems:"flex-start", textAlign: "left", verticalAlign: "text-top" }}
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
                        <ul className='validation-errors'>
                            {errors.length>0 && (errors.map((error, idx) => <li key={idx}>{error}</li>))}
                        </ul>
                </form>
            </div>
        </>
    )
}

export default PostForm
