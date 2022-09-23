import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profilePicUrl, setProfilePicUrl] = useState('');
  const [bio, setBio] = useState('');
  const [password, setPassword] = useState('');
  // TODO: make the states and inputs for signup inputs
  // const [profile_pic, setProfilePic]
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, firstName, lastName, profilePicUrl, bio));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(['Passwords need to match'])
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateProfilePicUrl = (e) => {
    setProfilePicUrl(e.target.value);
  };

  const updateBio = (e) => {
    setBio(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='whole-signup-page'>
      <div className='whole-signup-form-container'>
        <div style={{ fontSize: '50px', fontFamily: 'BillabongW00-Regular', marginTop: '30px' }} >
          Sweetiegram
        </div>
        <div className='spacer-form'>
          <div className='signup-form-text'>
            Sign up to see photos and videos from your friends
          </div>
          <form onSubmit={onSignUp}>
            <div id="signup-errors">
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div>
              <label></label>
              <input
                className='signup-form-boxes'
                type='text'
                name='username'
                onChange={updateUsername}
                value={username}
                placeholder="User Name"
              ></input>
            </div>
            <div >
              <label></label>
              <input
                className='signup-form-boxes'
                type='text'
                name='email'
                onChange={updateEmail}
                value={email}
                placeholder="Email"
              ></input>
            </div>
            <div >
              <label></label>
              <input
                className='signup-form-boxes'
                type='text'
                name='firstName'
                onChange={updateFirstName}
                value={firstName}
                placeholder="First Name"
              ></input>
            </div>
            <div >
              <label></label>
              <input
                className='signup-form-boxes'
                type='text'
                name='lastName'
                onChange={updateLastName}
                value={lastName}
                placeholder="Last Name"
              ></input>
            </div>
            <div >
              <label></label>
              <input
                className='signup-form-boxes'
                type='text'
                name='profilePicUrl'
                onChange={updateProfilePicUrl}
                value={profilePicUrl}
                placeholder="Profile Pic URL"
              ></input>
            </div>
            <div >
              <label></label>
              <input
                className='signup-form-boxes'
                type='textarea'
                name='bio'
                onChange={updateBio}
                value={bio}
                placeholder="Bio"
              ></input>
            </div>
            <div >
              <label></label>
              <input
                className='signup-form-boxes'
                type='password'
                name='password'
                onChange={updatePassword}
                value={password}
                placeholder="Password"
              ></input>
            </div>
            <div >
              <label></label>
              <input
                className='signup-form-boxes'
                type='password'
                name='repeat_password'
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
                placeholder="Repeat Password"
              ></input>
            </div>
            {username.length > 0 && email.length > 0 && password.length > 0 && firstName.length > 0
              && lastName.length > 0 && profilePicUrl.length > 0 && bio.length > 0 && repeatPassword.length > 0 &&
              <button type='submit' className='signup-form-signup-button'>Sign Up</button>
            }
            {(username.length === 0 || email.length === 0 || password.length === 0 || firstName.length === 0
              || lastName.length === 0 || profilePicUrl.length === 0 || bio.length === 0 || repeatPassword.length === 0) &&
              <button type='submit' className='signup-form-signup-button' id='signup-form-signup-button-id' disabled={true}>Sign Up</button>
            }

          </form>
        </div>

      </div>

      <div className='signup-form-login-container'>
        <div id='login-button-on-signup-page'>
          Have an account? <NavLink to='/login' style={{ textDecoration: 'None', color: '#458EFF' }}>Log in</NavLink>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
