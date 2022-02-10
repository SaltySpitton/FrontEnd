import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormInput } from '../css/Form.styled';
import { AppButton } from '../css/Button.styled';
import '../css/Login.css'
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';

import Axios from "axios";

const Login = () => {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate()

  const register = () => {
    Axios({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPassword,
        email: registerEmail,
      },
      withCredentials: true,
      url: "http://localhost:4200/users/register",
    }).then((res) => console.log(res));
  }

  const login = () => {
    Axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:4200/users/login",
    }).then((res) => {
      navigate(-1)
      console.log(res)

    })
  }

  const getUser = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4200/users",
    }).then((res) => {
      setUser(res.data)
      console.log(res.data)
    })
  }

  return (
    <div>
      <div className="login">
        <h2 className="loginTitle">Choose a Login Method</h2>
        <div className="wrapper">
          <div className="left">
            <div className="loginButton google" >
              <GoogleIcon />
              Google
            </div>
            <div className="loginButton github" >
              <GitHubIcon />
              Github
            </div>
          </div>
          <div className="center">
            <div className="line" />
            <div className="or">OR</div>
          </div>
          <div className="right">
            <FormInput width={"60%"}
              type="text"
              placeholder="Username"
              onChange={(e) => setLoginUsername(e.target.value)}
            />
            <FormInput
              width={"60%"}
              type="password"
              placeholder="Password"
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <AppButton bg="hsla(90, 52%, 58%, 80%)" onClick={login}>Login</AppButton>
          </div>
        </div>
      </div>



      <div>
        <h1>Register</h1>
        <FormInput
          placeholder="username"
          onChange={(e) => setRegisterUsername(e.target.value)}
        />
        <FormInput
          placeholder="password"
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <FormInput
          placeholder="email"
          onChange={(e) => setRegisterEmail(e.target.value)}
        />
        <button onClick={register}>Submit</button>
      </div>


      <div>
        <h1>Get User</h1>
        <button onClick={getUser}>Submit</button>
        {user ? <h1>Welcome Back {user.username}</h1> : null}
      </div>
    </div>
  );
};

export default Login;
