import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react';
import Home from './components/Home';
import Questions from './components/Questions';
import Answers from  './components/Answers';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import UserDataProfile from './components/UserDataProfile';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Axios from "axios";

//link to color picker
//https://material.io/resources/color/#!/?view.left=0&view.right=1&primary.color=42A5F5&secondary.color=3F51B5
// https://mui.com/components/bottom-navigation/$
const theme = createTheme({
    palette: {
        primary: {
            main: '#a4e265',
            light: '#d8ff96',
            dark: '#72b035',
        },
          secondary: {
            main: '#282828',
            light: '#505050',
            dark: '#000000',
          },
        
  },
    typography: {
      fontFamily: [
        'Roboto Mono',
        'sans-serif',
      ].join(','),
    },
})



function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
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
    getUser();
  }, []);


  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <Routes>

        <Route path='/' element={<Home/>}/>
        <Route path='/questions' element={<Questions/>}/>
          <Route path='/answers' element={<Answers />} />
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/userdata' element={<UserDataProfile/>}/>
      
      </Routes>
      </ThemeProvider>
    </div>
  )
}

export default App;
