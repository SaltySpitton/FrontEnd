import { Routes, Route } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { UserProvider } from './components/UserContext';
import Home from './components/Home';
import TagsDetails from './components/Tags/TagsDetails';
import Questions from './components/Questions';
import QuestionView from './components/Questions/QuestionView';
import QuestionForm from './components/Questions/QuestionForm';
import Login from './components/Login';
import UserProfile from './components/Profile/UserProfile';
import PageNotFound from './components/PageNotFound';
import ProfileForm from './components/Profile/ProfileForm';
import Layout from './components/Layout/Layout';


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
              <Route path='/ask' element={<QuestionForm />} />
              <Route path='/login' element={<Login />} />
              <Route path='/userdata/:userId' element={<UserProfile />} />
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
