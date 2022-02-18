import { Routes, Route } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react';
import Home from './components/Home';
import TagsDetails from './components/TagsDetails';
import Answers from './components/Answers'
import Questions from './components/Questions';
import QuestionView from './components/QuestionView';
import QuestionEdit from './components/QuestionEdit'
import AnswersEdit from  './components/AnswersEdit';
import QuestionForm from './components/QuestionForm';
import Login from './components/Login';
import UserDataProfile from './components/UserDataProfile';
import PageNotFound from './components/PageNotFound';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from './components/Layout';
import { UserProvider } from './components/UserContext';
import ProfileForm from './components/ProfileForm';



//link to color picker
//https://material.io/resources/color/#!/?view.left=0&view.right=1&primary.color=42A5F5&secondary.color=3F51B5
// https://mui.com/components/bottom-navigation/$
const theme = createTheme({
    palette: {
        primary: {
        main: '#72b035',
        light: '#EAF4DF',
        dark: '#408000',
        },
          secondary: {
            main: '#72b035',
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
});

function App() {
  return (
    <UserProvider>
      <Layout>
        <div className="App">
          <ThemeProvider theme={theme}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/questions' element={<Questions />} />
              <Route path='/questions/:questionId' element={<QuestionView />} />
              <Route path='/answers' element={<Answers />} />
              <Route path='/ask' element={<QuestionForm />} />
              <Route path='/login' element={<Login />} />
              <Route path='/userdata' element={<UserDataProfile />} />
              <Route path='/userdata/:userId' element={<UserDataProfile />} />
              <Route path='/profile' element={<ProfileForm />} />
              <Route path='/tags' element={<TagsDetails />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </ThemeProvider>
        </div>
      </Layout>
    </UserProvider>
  );
}

export default App;
