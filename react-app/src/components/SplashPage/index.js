import React from "react";
import { NavLink } from "react-router-dom";
import LoginForm from "../auth/LoginForm";
import phonesImage from "./phones-image.jpg"
import "./SplashPage.css";

const SplashPage = () => {
  return (
    <div>
      <div id='splashpage-overall-container'>
        <div id='splashpage-grid'>
          <div id='phone-image-container'>
            {/* <div id='phone-image'>Image of phones here</div> */}
            <img src={phonesImage} alt='Image of Phones' />
          </div>
          <div id='splashpage-login-signup-wrapper'>
            <div id='splashpage-login-form'>
              <div id='splashpage-login-form-sweetigram-logo-container'>
                <div id='splashpage-sweetiegram-logo'>Sweetiegram</div>
              </div>
              <div id='splashpage-login-form-textfields'>
                <LoginForm />
              </div>
            </div>
            <div id='splashpage-signup-button'>
              <div id='splashpage-signup-button-text'>Don't have an account?</div>
              <NavLink id='splashpage-signup-navlink' to='/sign-up'>Sign up</NavLink>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SplashPage;
