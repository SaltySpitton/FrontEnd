import { createContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

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
  const [profile, setProfile] = useState();
  const [user, setUser] = useState("");
  const [displayQuestions, setDisplayQuestions] = useState("");

  const login = () => {
    axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:4200/users/login",
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
      url: "http://localhost:4200/users/register",
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
      url: "http://localhost:4200/users",
    }).then((res) => {
      setUser(res.data)
      console.log(res.data)
      return user
    });
  };

  const logout = () => {
    axios({
      method: "POST",
      withCredentials: true,
      url: "http://localhost:4200/users/logout",
    }).then((res) => {
      setUser(null)
      navigate("/questions")
      localStorage.removeItem("user")
    });
  };

  const searchByTag = async(tag) => {
    let returnQuestions
    setIsLoading(true)
    tag ? 
    returnQuestions = await axios.get(`http://localhost:4200/questions?tags=${tag}`) : 
    returnQuestions = await axios.get(`http://localhost:4200/questions`)
    console.log('return questions', returnQuestions)
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
