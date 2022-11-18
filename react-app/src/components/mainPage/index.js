import './main.css'
import MainPagePosts from '../MainPage-Posts/index'
import Profiles from '../profiles/index'
import { useSelector } from 'react-redux'
import { NavLink, useHistory } from "react-router-dom"
import React from 'react'
import JB_photo from './images/jb.jpeg'
import Daniel_photo from './images/daniel.jpg'
import Ladan_photo from './images/ladan.png'
import Tiff_photo from './images/tiff.png'

function MainPage() {
    const sessionUser = useSelector((state) => state.session.user);
    // const followings = useSelector(state => Object.values(state.followings))
    const history = useHistory()
    // console.log(sessionUser)

    let displaySuggestions = () => {


        let user = (
            <div className='mainpage-right-user-container'>
                <NavLink to={`/users/${sessionUser.id}`}>
                    <div className='mainpage-right-img-container'>
                        <img src={sessionUser.profilePicUrl} className='mainpage-right-img' alt="right" ></img>
                    </div>
                </NavLink>
                <div className='mainpage-right-username-name-container'>
                    <div className='mainpage-right-username' onClick={() => { history.push(`/users/${sessionUser.id}`) }}>
                        {sessionUser.username}
                    </div>
                    <div className='mainpage-right-name'>
                        {sessionUser.firstName} {sessionUser.lastName}
                    </div>
                </div>
            </div >

        )


        let groupMembers = (

            <div>
                <div className='mainpage-groupMembers'>
                    <div className='mainpage-group-img-container'>
                        <img src={Daniel_photo} className='mainpage-right-img' alt="Daniel" ></img>
                    </div>
                    <div className='mainpage-right-username-name-container'>
                        <a href='https://www.linkedin.com/in/danielhoffmann-1/' target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                            <div className='mainpage-suggestions-username' style={{ color: 'black' }}>
                                Daniel Hoffmann
                            </div>
                            <div className='mainpage-suggestions-name'>
                                Sweetiegram recommended
                            </div>
                        </a>
                    </div>
                    <div className='mainpage-follow-button-container'>
                        <a href='https://www.linkedin.com/in/danielhoffmann-1/' target="_blank" rel="noreferrer" className='github-link'> Follow</a>
                    </div>
                </div>

                <div className='mainpage-groupMembers'>
                    <div className='mainpage-group-img-container'>
                        <img src={JB_photo} className='mainpage-right-img' alt="JB" ></img>
                    </div>
                    <div className='mainpage-right-username-name-container'>
                        <a href='https://www.linkedin.com/in/justin-b-kam-4105961a5/' target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                            <div className='mainpage-suggestions-username' style={{ color: 'black' }}>
                                JB Kam
                            </div>
                            <div className='mainpage-suggestions-name'>
                                Sweetiegram recommended
                            </div>
                        </a>
                    </div>
                    <div className='mainpage-follow-button-container'>
                        <a href='https://www.linkedin.com/in/justin-b-kam-4105961a5/' target="_blank" rel="noreferrer" className='github-link'> Follow</a>
                    </div>
                </div>

                <div className='mainpage-groupMembers'>
                    <div className='mainpage-group-img-container'>
                        <img src={Ladan_photo} className='mainpage-right-img' alt="Ladan" ></img>
                    </div>
                    <div className='mainpage-right-username-name-container'>
                        <a href='https://www.linkedin.com/in/ladan-nazari/ ' target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                            <div className='mainpage-suggestions-username' style={{ color: 'black' }}>
                                Ladan Nazari
                            </div>
                            <div className='mainpage-suggestions-name'>
                                Sweetiegram recommended
                            </div>
                        </a>
                    </div>
                    <div className='mainpage-follow-button-container'>
                        <a href='https://www.linkedin.com/in/ladan-nazari/ ' target="_blank" rel="noreferrer" className='github-link'> Follow</a>
                    </div>
                </div>

                <div className='mainpage-groupMembers'>
                    <div className='mainpage-group-img-container'>
                        <img src={Tiff_photo} className='mainpage-right-img' alt="Tiffany" ></img>
                    </div>
                    <div className='mainpage-right-username-name-container'>
                        <a href='https://www.linkedin.com/in/tiffany-yang-373140133/' target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                            <div className='mainpage-suggestions-username' style={{ color: 'black' }}>
                                Tiffany Yang
                            </div>
                            <div className='mainpage-suggestions-name'>
                                Sweetiegram recommended
                            </div>
                        </a>
                    </div>
                    <div className='mainpage-follow-button-container'>
                        <a href='https://www.linkedin.com/in/tiffany-yang-373140133/' target="_blank" rel="noreferrer" className='github-link'> Follow</a>
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
                    <div style={{ color: 'rgb(167, 157, 157)', fontWeight: "550", fontSize: "14px" }}>
                        Suggestions For You
                    </div>
                    <div>
                        {groupMembers}
                    </div>
                    <div style={{ marginTop: '30px', color: 'rgb(167, 157, 157)' }}>
                        About:
                    </div>
                    <div style={{ marginTop: '30px', color: 'rgb(167, 157, 157)' }}>
                      <div style={{marginBottom: "15px"}}>
                        <svg height="24" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="24" data-view-component="true" class="octicon octicon-mark-github v-align-middle">
                            <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                        </svg>
                        <a href='https://github.com/Pepa90210/Sweetiegram' target="_blank" rel="noreferrer"
                            style={{ textDecoration: 'none', color: 'black' }}
                        > Github Repo Link</a>
                      </div>
                      <div style={{display: "flex", alignItems: "center"}}>
                        <svg style={{marginRight: "5px"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="black" class="mercado-match" width="24" height="24" focusable="false">
                          <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                        </svg>
                        <a href='https://github.com/Pepa90210/Sweetiegram/wiki' target="_blank" rel="noreferrer"
                            style={{ textDecoration: 'none', color: 'black' }}
                        > Github Wiki Link</a>
                      </div>

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
                            {/* {followings.length > 0 && ( */}
                            <div>
                                {Profiles()}
                            </div>
                            {/* )} */}
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
