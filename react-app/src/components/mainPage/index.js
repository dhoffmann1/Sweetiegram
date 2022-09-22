import './main.css'
import MainPagePosts from '../MainPage-Posts/index'
import Profiles from '../profiles/index'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { getPosts } from "../../store/post"
import { NavLink } from "react-router-dom"
import React from 'react'

function MainPage() {

    const sessionUser = useSelector((state) => state.session.user);
    // console.log(sessionUser)

    let displaySuggestions = () => {



        let user = (
            <div className='mainpage-right-user-container'>
                <div className='mainpage-right-img-container'>
                    <img src={sessionUser.profilePicUrl} className='mainpage-right-img'></img>
                </div>
                <div className='mainpage-right-username-name-container'>
                    <div className='mainpage-right-username'>
                        {sessionUser.username}
                    </div>
                    <div className='mainpage-right-name'>
                        {sessionUser.firstName} {sessionUser.lastName}
                    </div>
                </div>
            </div>

        )


        let groupMembers = (

            <div>
                <div className='mainpage-groupMembers'>
                    <div className='mainpage-group-img-container'>
                        {/* <img src={} className='mainpage-right-img'></img> */}
                    </div>
                    <div className='mainpage-right-username-name-container'>
                        <div className='mainpage-suggestions-username'>
                            Daniel Hoffmann
                        </div>
                        <div className='mainpage-suggestions-name'>
                            Sweetiegram recommended
                        </div>
                    </div>
                    <div className='mainpage-follow-button-container'>
                        <a href='' target="_blank" className='github-link'> Follow</a>
                    </div>
                </div>

                <div className='mainpage-groupMembers'>
                    <div className='mainpage-group-img-container'>
                        {/* <img src={} className='mainpage-right-img'></img> */}
                    </div>
                    <div className='mainpage-right-username-name-container'>
                        <div className='mainpage-suggestions-username'>
                            JB Kam
                        </div>
                        <div className='mainpage-suggestions-name'>
                            Sweetiegram recommended
                        </div>
                    </div>
                    <div className='mainpage-follow-button-container'>
                        <a href='https://github.com/jb3k?tab=repositories' target="_blank" className='github-link'> Follow</a>
                    </div>
                </div>

                <div className='mainpage-groupMembers'>
                    <div className='mainpage-group-img-container'>
                        {/* <img src={} className='mainpage-right-img'></img> */}
                    </div>
                    <div className='mainpage-right-username-name-container'>
                        <div className='mainpage-suggestions-username'>
                            Ladan Nazari
                        </div>
                        <div className='mainpage-suggestions-name'>
                            Sweetiegram recommended
                        </div>
                    </div>
                    <div className='mainpage-follow-button-container'>
                        <a href='' target="_blank" className='github-link'> Follow</a>
                    </div>
                </div>

                <div className='mainpage-groupMembers'>
                    <div className='mainpage-group-img-container'>
                        {/* <img src={} className='mainpage-right-img'></img> */}
                    </div>
                    <div className='mainpage-right-username-name-container'>
                        <div className='mainpage-suggestions-username'>
                            Tiffany Yang
                        </div>
                        <div className='mainpage-suggestions-name'>
                            Sweetiegram recommended
                        </div>
                    </div>
                    <div className='mainpage-follow-button-container'>
                        <a href='' target="_blank" className='github-link'> Follow</a>
                    </div>
                </div>

            </div>
        )

        return (
            <>
                <div className='mainpage-suggestions'>
                    <div>
                        {user}
                    </div>
                    <div style={{ color: 'rgb(167, 157, 157)' }}>
                        Suggestions For You
                    </div>
                    <div>
                        {groupMembers}
                    </div>


                </div>

            </>
        )

    }

    return (
        <>
            <div className='whole-page'>
                <div className="container-page">
                    <div className="left-main">
                        <div className='left-main-container'>
                            <div className="storiesbox">
                                {Profiles()}
                            </div>
                            <div>
                                {MainPagePosts()}
                            </div>
                        </div>
                    </div>
                    <div className="right-main">
                        {displaySuggestions()}
                    </div>

                </div>
            </div>
        </>
    )



}

export default MainPage
