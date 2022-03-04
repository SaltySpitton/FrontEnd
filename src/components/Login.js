import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
import { FormInput } from './styled/Form.styled';
import { AppButton } from './styled/Button.styled';
import '../css/Login.css'
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import UserContext from "./UserContext";

// import Axios from "axios";

const Login = () => {
  const { setLoginUsername, setLoginPassword, login, errorMessage } = useContext(UserContext)

  return (
    <div>
      <div className="login">
        {/* <h2 className="loginTitle">Choose a Login Method</h2> */}
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
          {errorMessage && <div>{errorMessage}</div>}
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
    </div>
  );
};

export default Login;
