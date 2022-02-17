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
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState('');
  const [tagResult, setTagResult] = useState([])
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
          console.log(res)
          navigate(-1);
    })
    .catch(err => {
      if(err){
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

  const getAllQuestions = async() => {
      setIsLoading(true)
      const apiUrl = 'http://localhost:4200/questions'
      let allQuestions = await Axios.get(apiUrl)
      console.log(allQuestions)
      await setQuestions(allQuestions.data.questions.docs)
      console.log(questions)
      setIsLoading(false)
  }

  const searchByTag = async(tag) => {
        setIsLoading(true)
        let apiUrl = `http://localhost:4200/questions?tags=${tag}` 
        const tagSearch = await Axios.get(apiUrl)
        await setTagResult(tagSearch.data.docs)
        await setQuestions(tagSearch.data.docs)
        setIsLoading(false)
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
        isLoading, 
        setIsLoading,
        questions, 
        setQuestions,
        getAllQuestions,
        searchByTag
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
