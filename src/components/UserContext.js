import { createContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [getEnvUrl, setGetEnvUrl] = useState("")

  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState('');
  const [tagResult, setTagResult] = useState([])
  const [profile, setProfile] = useState()
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(()=>{

    const getEnvUrl = process.env.REACT_APP_ENV === 'production' ? 'https://stackdevhelp-backend.herokuapp.com' : 'http://localhost:4200' 
    setGetEnvUrl(getEnvUrl) 
  },[])
  
  const login = () => {                                                                                                                                             
    Axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: `${getEnvUrl}/users/login`,
    }).then((res) => {
      getUser()
      getUserProfile()
      localStorage.setItem("user", res.data._id)
      console.log(res)
      navigate("/questions");
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
      url: `${getEnvUrl}/users/register`,
    }).then((res) => {
      console.log(res)
      localStorage.setItem("user", res.data)
      console.log(res)
      navigate("/questions");
    });
  };

  const getUser = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: `${getEnvUrl}/users`,
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
      url: `${getEnvUrl}/users/logout`,
    }).then((res) => {
      setUser(null);
      // getUser();
      navigate("/questions");
      localStorage.removeItem("user")
      // console.log(`we hit this route`);
    });
  };

  const getAllQuestions = async() => {
      setIsLoading(true)
      const apiUrl = `${getEnvUrl}/questions`
      let allQuestions = await Axios.get(apiUrl)
      // console.log(allQuestions)
      await setQuestions(allQuestions.data.questions)
      console.log(questions)
      setIsLoading(false)
  }

  const searchByTag = async(tag) => {
        setIsLoading(true)
        let apiUrl = `${getEnvUrl}/questions?tags=${tag}` 
        const tagSearch = await Axios.get(apiUrl)
        await setTagResult(tagSearch.data.docs)
        await setQuestions(tagSearch.data.docs)
        setIsLoading(false)

  }
  const getUserProfile = async () => {
    // getUser()
    const url = `${getEnvUrl}/userdata/${localStorage.getItem("user")}`
    const userProfile = await Axios.get(url)
    setProfile(userProfile.data[0])
    console.log("Logging getUserProfile function: " + profile._id)
  }
  const dateDifference = (createdAt) => {
    const showCreatedDate = new Date(createdAt).toLocaleString('en')
    const createdAtMilisec = new Date(createdAt).getTime()

    const Today = new Date()
    const today = Today.getTime()

    const timeDifference = today - createdAtMilisec
    const hours = (timeDifference / 3600000)

    if (hours > 12) {
      return showCreatedDate
    }
    if (hours > 1 && hours <= 12) {
      return `${Math.floor(hours)} hours ago`
    }
    if (hours < 2 && hours > 1) {
      return `${Math.floor(hours)} hour ago`
    }

    const minutes = (timeDifference / 60000)
    const seconds = (timeDifference / 1000)
    console.log(minutes)
    console.log(seconds)

    if (minutes < 59 && minutes > 1) {
      return `${Math.floor(minutes)} minutes ago`
    }
    if (minutes <= 1) {
      return `${Math.floor(seconds)} seconds ago`
    }
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
        searchByTag,
        errorMessage,
        setErrorMessage,
        profile,
        setProfile,
        getUserProfile,
        getEnvUrl,
        dateDifference
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
