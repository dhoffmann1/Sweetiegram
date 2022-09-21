import './navbar.css'
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react'
import LogoutButton from '../auth/LogoutButton';
import CreatePostFormModal from '../CreatePostFormModal';

const NavBar = () => {

  const [open, setOpen] = useState(false)
  // added here
  const [postFormModal, setPostFormModal] = useState(false)

  const handleCreatePost = e => {
    setPostFormModal(true)
  }
  console.log("Form Modal:", postFormModal)

  const profileMenu = () => {

    let dropDownMenu = (
      <div className='dropdown-menu'>
        <div className='dropdown-profile-bttn'>
          <i class="fa-regular fa-circle-user"></i>
          Profile
        </div>
        <div className='dropdown-divider'></div>
        <div>
          <LogoutButton />
        </div>
      </div>
    )


    return (
      <>
        <button className='nav-profile-bttn' onClick={() => setOpen(!open)} >
          <i class="fa-regular fa-circle-user"></i>
        </button>
        {open && dropDownMenu}
      </>
    )
  }

  return (
    <nav>
      <div className='navbar'>
        <div className='InstaLogo'>
          <h1> Sweetiegram</h1>
        </div>
        <div className='navLinks'>
          <div>
            <NavLink to='/' exact={true} activeClassName='active' style={{ fontSize: "20px", color: "black" }}>
              <i class="fa-solid fa-house"></i>
            </NavLink>
          </div>
          <div className="create-post-button" onClick={handleCreatePost}>
            {/* <NavLink to='/sign-up' exact={true} activeClassName='active' style={{ fontSize: "25px", color: "black" }}> */}
              <i class="fa-regular fa-square-plus" >
                {postFormModal && (<CreatePostFormModal setPostFormModal={setPostFormModal} postFormModal={postFormModal}/>)}
              </i>
            {/* </NavLink> */}
          </div>
          <div>
            <NavLink to='/users' exact={true} activeClassName='active' style={{ fontSize: "25px", color: "black" }}>
              <i class="fa-solid fa-magnifying-glass"></i>
            </NavLink>
          </div>
          <div>
            {profileMenu()}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
