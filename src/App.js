import { Routes, Route } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react';
import Home from './components/Home';
import Tags from './components/Tags';
import Questions from './components/Questions';
import QuestionView from './components/QuestionView';
import Answers from  './components/Answers';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import UserDataProfile from './components/UserDataProfile';
import PageNotFound from './components/PageNotFound';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from './components/Layout';
import { UserProvider } from './components/UserContext';



//link to color picker
//https://material.io/resources/color/#!/?view.left=0&view.right=1&primary.color=42A5F5&secondary.color=3F51B5
// https://mui.com/components/bottom-navigation/$
const theme = createTheme({
  palette: {
    primary: {
      main: "#a4e265",
      light: "#d8ff96",
      dark: "#72b035",
    },
    secondary: {
      main: "#282828",
      light: "#505050",
      dark: "#000000",
    },
  },
  typography: {
    fontFamily: ["Roboto Mono", "sans-serif"].join(","),
  },
});

function App() {
  return (
    <UserProvider>
      <Layout>
        <div className="App">
          <ThemeProvider theme={theme}>
            <Routes>

              <Route path='/' element={<Home />} />
              <Route path='/tags' element={<Tags />}/>
              <Route path='/questions' element={<Questions />} />
              <Route path='/questions/:questionId' element={<QuestionView />} />
              <Route path='/answers' element={<Answers />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/login' element={<Login />} />
              <Route path='/userdata' element={<UserDataProfile />} />
              <Route path='/userdata/:userId' element={<UserDataProfile /> }/>
              <Route path="*" element={<PageNotFound />} />

            </Routes>
          </ThemeProvider>
        </div>
      </Layout>
    </UserProvider>
  );
}

export default App;
