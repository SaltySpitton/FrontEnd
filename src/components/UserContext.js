import { createContext, useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

import Axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState("");
  const [perPage, setPerPage] = useState(15)
  const [totalPages, setTotalPages] = useState(0)
  const [searchTag, setSearchTag] = useState('')
  const [profile, setProfile] = useState()
  const [user, setUser] = useState(null);
  const [displayQuestions, setDisplayQuestions] = useState('')
  const navigate = useNavigate();
  const location = useLocation();
  
  const [searchParams, setSearchParams] = useSearchParams()
  
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
      navigate("/questions");
    })
      .catch(err => {
        if (err) {
          errorMessenger('Invalid Username or Password, please try again')
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
      localStorage.setItem("user", res.data)
      navigate("/questions");
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
    });
  };

  const logout = () => {
    Axios({
      // method: "GET",
      method: "POST",
      withCredentials: true,
      url: "http://localhost:4200/users/logout",
    }).then((res) => {
      setUser(null);
      // getUser();
      navigate("/questions");
      localStorage.removeItem("user")
      // console.log(`we hit this route`);
    });
  };

  const searchByTag = async(tag) => {
    let returnQuestions
    setIsLoading(true)
    tag ? 
    returnQuestions = await Axios.get(`http://localhost:4200/questions?tags=${tag}`) : 
    returnQuestions = await Axios.get(`http://localhost:4200/questions`)
    console.log('return questions', returnQuestions)
    await setQuestions(returnQuestions.data.questions)
    // console.log(questions)
    setIsLoading(false)
  }


  const getUserProfile = async (userId) => {
    // getUser()
    let url;
    if (user){
      url = `http://localhost:4200/userdata/${userId}`
      const userProfile = await Axios.get(url)
      return await setProfile(userProfile)
    }

    url = `http://localhost:4200/userdata/${localStorage.getItem("user")}`
    const userProfile = await Axios.get(url)
    setProfile(userProfile.data[0])
    console.log("Logging getUserProfile function: " + profile._id)
  }
  
  const errorMessenger = (message, time=2000) => {
      setErrorMessage(message)
      setTimeout(()=> {
        setErrorMessage("")
      }, time)
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
        errorMessenger,
        isLoading, 
        setIsLoading,
        questions, 
        setQuestions,
        searchByTag,
        errorMessage,
        setErrorMessage,
        profile,
        setProfile,
        getUserProfile,
        searchParams, 
        setSearchParams,
        searchTag, 
        setSearchTag,
        perPage,
        setPerPage,
        totalPages,
        setTotalPages,
        // displayQuestions,
        // setDisplayQuestions
      
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
