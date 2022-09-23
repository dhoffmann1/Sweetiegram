import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onLogin}>
      <div id="login-errors">
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor='email'>
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
            className='login-form-input-text-field'
          />
        </label>
      </div>
      <div>
        <label htmlFor='password'>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
            className='login-form-input-text-field'
          />
        </label>
      </div>
      {email.length > 0  && password.length > 0 &&
      <button className='login-form-buttons' id='login-form-submit-button' type='submit'>Log In</button>}
      {(email.length === 0  || password.length === 0) &&
      <button className='login-form-buttons' id='login-form-submit-button-disabled' type='submit' disabled={true} >Log In</button>}

      <button className='login-form-buttons' id='demo-user-login-button' onClick={(e) => {
        e.preventDefault();
        setEmail('user1@gmail.com');
        setPassword('password')
      }}>Log In as Demo User</button>
    </form>

  );
};

export default LoginForm;
