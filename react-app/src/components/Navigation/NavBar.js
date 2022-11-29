import './navbar.css'
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react'
import LogoutButton from '../auth/LogoutButton';
import CreatePostFormModal from '../CreatePostFormModal';
import SearchBar from '../SearchBar';
// import AllPostsPage from '../AllPostsPage';

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const [open, setOpen] = useState(false)
  // added here
  const [postFormModal, setPostFormModal] = useState(false)

  // const handleCreatePost = e => {
  //   setPostFormModal(true)
  // }

  const profileMenu = () => {

    let dropDownMenu = (
      <div className='dropdown-menu'>
        <div className='dropdown-profile-bttn'>
          <div>
            <i class="fa-regular fa-circle-user"></i>
          </div>
          <NavLink to={`/users/${sessionUser.id}`} className='mainpage-posts-navlink-profile'>
            <div style={{ marginLeft: '8px' }}>
              Profile
            </div>
          </NavLink>
        </div>
        <div className='dropdown-divider'></div>
        <div className='navbar-logout-button'>
          <LogoutButton />
        </div>
      </div>
    )


    return (
      <>
        {/* <NavLink exact to="/profile"> */}
        <button className='nav-profile-bttn' onClick={() => setOpen(!open)} >
          <i class="fa-regular fa-circle-user"></i>
        </button>
        {open && dropDownMenu}
        {/* </NavLink> */}
      </>
    )
  }

  return (
    <header>
      <nav>
        <div className='navbar'>
          <div className='InstaLogo'>
            <NavLink to='/' style={{ textDecoration: 'none' }}>
              <h1 className='Sweetiegram-logo'> Sweetiegram</h1>
            </NavLink>
          </div>
          <div className='navbar-searchbar-container'>
          <div className='navbar-searchbar'>
            <i class="fa-solid fa-magnifying-glass" style={{ marginLeft: '8px' }}></i>
            {<SearchBar />}
          </div>
        </div>

          <div className='navLinks'>
            <div>
              <NavLink to='/' exact={true} activeClassName='active' style={{ fontSize: "20px", color: "black" }}>
                <i class="fa-solid fa-house"></i>
              </NavLink>
            </div>
            <div className="create-post-button" onClick={() => setPostFormModal(true)}>
              <i class="fa-regular fa-square-plus" >
              </i>
            </div>
            <NavLink to="/explore">
              <div className='explore-button'>
                <svg aria-label="Explore" class="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="m13.173 13.164 1.491-3.829-3.83 1.49ZM12.001.5a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12.001.5Zm5.35 7.443-2.478 6.369a1 1 0 0 1-.57.569l-6.36 2.47a1 1 0 0 1-1.294-1.294l2.48-6.369a1 1 0 0 1 .57-.569l6.359-2.47a1 1 0 0 1 1.294 1.294Z"></path></svg>
              </div>
            </NavLink>
            <div>
              <NavLink to='/allusers' exact={true} activeClassName='active' style={{ fontSize: "25px", color: "black" }}>
                <i class="fa-solid fa-magnifying-glass"></i>
              </NavLink>
            </div>
            <div>
              {profileMenu()}
            </div>
          </div>
        </div>
      </nav>
      {postFormModal && (<CreatePostFormModal setPostFormModal={setPostFormModal} />)}
    </header>
  );
}

export default NavBar;
