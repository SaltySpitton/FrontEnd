import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_API

  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [questions, setQuestions] = useState("");
  const [searchTag, setSearchTag] = useState("");
  const [perPage, setPerPage] = useState(15);
  const [user, setUser] = useState({});


  const login = () => {
    axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,

      url: `${baseURL}/users/login`,
    })
      .then((res) => {
        getUser()
        localStorage.setItem("user", res.data._id)
        navigate("/questions")
      })
      .catch((err) => {
        if (err) {
          errorMessenger('Invalid Username or Password, please try again')
        }
      });
  };

  const register = () => {
    axios({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPassword,
        email: registerEmail,
      },
      withCredentials: true,
      url: `${baseURL}/users/register`,
    }).then((res) => {
      console.log(res)
      localStorage.setItem("user", res.data)
      navigate("/questions")
    });
  };

  const getUser = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: `${baseURL}/users`,
    }).then((res) => {
      setUser(res.data)
      // console.log(res.data)
      return user
    });
  };

  const logout = () => {
    axios({
      method: "POST",
      withCredentials: true,
      url: `${baseURL}/users/logout`,
    }).then((res) => {
      setUser({})
      localStorage.removeItem("user")
      navigate("/questions")
      console.log(user)
    });
  };


  const searchByTag = async(tag) => {
    let returnQuestions
    setIsLoading(true)
    tag ? 
      returnQuestions = await axios.get(`${baseURL}/questions?tags=${tag}`) :
      returnQuestions = await axios.get(`${baseURL}/questions`)
    // console.log('return questions', returnQuestions)
    await setQuestions(returnQuestions.data.questions)
    setIsLoading(false)

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
        errorMessage,
        setErrorMessage,
        perPage,
        setPerPage,
        totalPages,
        setTotalPages,
        searchTag, 
        setSearchTag, 
        searchByTag,

      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
