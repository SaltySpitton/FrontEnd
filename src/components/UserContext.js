import { createContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

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
      getUser();
      navigate(-1);
      console.log(res);
             // FORM VALIDATION
      //if condition if status is not equal 200 then have message from backend save it in state
      // state will be empty string, update the message with message, show message on login form 
    });
  };

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
    }).then((res) => {
      getUser();
      login();
      console.log(res);
    });
  };

  const getUser = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4200/users",
    }).then((res) => {
      setUser(res.data);
      console.log(res.data);
      // console.log(`we hit this route`);
    });
  };

  const logout = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4200/users/logout",
    }).then((res) => {
      setUser(null);
      navigate(-1);
      getUser();
      console.log(`we hit this route`);
    });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        getUser,
        login,
        logout,
        register,
        registerUsername,
        setRegisterUsername,
        registerPassword,
        setRegisterPassword,
        registerEmail,
        setRegisterEmail,
        loginUsername,
        setLoginUsername,
        loginPassword,
        setLoginPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
