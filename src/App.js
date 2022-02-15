import { Routes, Route } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react';
import Home from './components/Home';
import Questions from './components/Questions';
import Answers from  './components/Answers';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import UserDataProfile from './components/UserDataProfile';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from './components/Layout'
import { UserProvider } from './components/UserContext';
import ProfileForm from './components/ProfileForm';


//link to color picker
//https://material.io/resources/color/#!/?view.left=0&view.right=1&primary.color=42A5F5&secondary.color=3F51B5
// https://mui.com/components/bottom-navigation/$
const theme = createTheme({
    palette: {
        primary: {
        main: '#72b035',
        light: '#d0e6ba',
        dark: '#408000',
        },
          secondary: {
            main: '#273817',
            light: '#50623e',
            dark: '#001300',
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
  return (
    <UserProvider>
      <Layout>
        <div className="App">
          <ThemeProvider theme={theme}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/questions' element={<Questions />} />
              <Route path='/answers' element={<Answers />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/login' element={<Login />} />
              <Route path='/userdata' element={<UserDataProfile />} />
              <Route path='/profile' element={<ProfileForm />} />
            </Routes>
          </ThemeProvider>
        </div>
      </Layout>
    </UserProvider>
  )
}

export default App;
