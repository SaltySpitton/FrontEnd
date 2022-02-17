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
  const [errorMessage, setErrorMessage] = useState("");
  const [profile, setProfile] = useState()
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
      getUser()
      getUserProfile()
      localStorage.setItem("user", res.data._id)
      console.log(res)
      navigate("/userdata");
    })
      .catch(err => {
        if (err) {
          setErrorMessage('Invalid Username or Password, please try again')
          setTimeout(() => {
            setErrorMessage('')
          }, 2000);
        }
      })
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
      console.log(res.data)
      console.log("Logging GetUser Function: " + user);
      return res.data
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
      localStorage.removeItem("user")
      // console.log(`we hit this route`);
    });
  };

  const getUserProfile = async () => {
    // getUser()
    const url = `http://localhost:4200/userdata/${localStorage.getItem("user")}`
    const userProfile = await Axios.get(url)
    setProfile(userProfile.data[0])
    console.log("Logging getUserProfile function: " + profile._id)
  }

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
        errorMessage,
        setErrorMessage,
        profile,
        setProfile,
        getUserProfile
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
