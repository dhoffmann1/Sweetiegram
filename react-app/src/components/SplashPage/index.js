import React from "react";
import NavLink from "react-router-dom";
import LoginForm from "../auth/LoginForm";
import "./SplashPage.css";

const SplashPage = () => {
  return (
    <div>
      <div id='spashpage-grid'>
        <div id='phone-image-container'>
          <div id='phone-image'>Image of phones here</div>
        </div>
        <div id='splashpage-login-signup-wrapper'>
          <div id='splashpage-login-form'>
            <LoginForm />
          </div>
          <div id='splashpage-signup-button'>
            <div id=''>Don't have an account?</div>
            <NavLink to='/sign-up'>Sign up</NavLink>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SplashPage;
