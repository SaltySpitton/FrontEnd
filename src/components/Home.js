import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react'
import { LinkButton } from '../css/Button.styled';
import { FormInput } from '../css/Form.styled';
import { AppButton } from '../css/Button.styled';
import UserContext from "./UserContext";
import Axios from 'axios'
import '../css/homepage.css'
import logo from '../images/logo.svg'
import reactIcon from '../images/react-original-wordmark.svg'
import htmlIcon from '../images/html5-original-wordmark.svg'
import cssIcon from '../images/css3-original-wordmark.svg'
import javaIcon from '../images/javascript-original.svg'
import djangoIcon from '../images/django-original.svg'
import cplusIcon from '../images/cplusplus-original.svg'
import qaBubbles from '../images/QA-bubbles.svg'
import checkMark from "../images/Vector 1.png"
import upvoted from '../images/votes-up.svg'


const Home = () => {
  const { register, setRegisterUsername, setRegisterEmail, setRegisterPassword } = useContext(UserContext)

  return (
    <div className="container">
      <div className="hero-section">
        <div className="hero-left">
          <img className="mainlogo" src={logo} alt="StackDevHelp logo" /> 
        <h1> 
            Q&A Without Distractions
        </h1>
        
          <p>With your help, we're working together to build a library of detailed answers to every question about programming. <strong>It's built and run by you.</strong>
        </p>

          <LinkButton m="2rem 0" p="1rem 3rem" to={`/questions`}> Explore Questions</LinkButton>
      </div>
      
        <div className="register-form">
          {/* <div className="login-link"> */}
          <Link to={'/login'}>Log in</Link>
          {/* </div> */}

          <FormInput
            width={"60%"}
            className="formSpaceInput"
            placeholder="Your Display Name"
            type="text" name="username"
            id='username'
            onChange={(e) => setRegisterUsername(e.target.value)}
          />

          <FormInput
            width={"60%"}
            className="formSpaceInput"
            placeholder="Email"
            type="text"
            name="email"
            id='email'
            onChange={(e) => setRegisterEmail(e.target.value)}
          />

          <FormInput
            width={"60%"}
            className="formSpaceInput"
            placeholder="Password"
            type="password"
            name="password"
            id='password'
            onChange={(e) => setRegisterPassword(e.target.value)}
          />

          {/* <FormInput
            width={"60%"} className="formSpaceInput" placeholder="Confirm Password" type="text" name="cPassword" id='cPassword' /> */}

          <AppButton
            bg="#292929"
            bcolor="#fff"
            color="#fff"
            className="newUserBttn"
            type="submit"
            id="submituser"
            onClick={register}
          >Sign Up Now!</AppButton>
        </div>
      </div>
      <div className="homeIcons">
      <img className='homeIcon' src={reactIcon} alt="React Icon" />
      <img className='homeIcon' src={htmlIcon} alt="HTML Icon" />
      <img className='homeIcon' src={cssIcon} alt="CSS Icon" />
      <img className='homeIcon' src={javaIcon} alt="Java Icon" />
      <img className='homeIcon' src={djangoIcon} alt="Django Icon" />
      <img className='homeIcon' src={cplusIcon} alt="C++ Icon" />
      </div>
      <div className="homeQuestions">
      <div className="homeLeft">
        <h1> 
          Ask Questions, Get Answers
        </h1>
        <p>
          This site is all about getting answers. It’s not a discussion forum. There’s  no chit-chat
        </p>
        <br /><br />

        <h3>
            <img className='listIcon' src={upvoted} alt="" />
          Good answers are voted up and rise to the top
        </h3>
        
        <p>
          The best answers show up first so that they are always easy to find
        </p>
        <br />

        <h3>
          <img  className='listIcon' src={checkMark} alt="Checkmark" />
          The person who asked can mark one answer as “accepted”
        </h3>
        <p>
          Accepting the best answer just means that it worked for the person who asked
        </p>
      </div>
      <div className="homeRight">
          <img className="homeRight" src={qaBubbles} alt="" />
        </div>   
      </div>
    </div>)
}

export default Home;
