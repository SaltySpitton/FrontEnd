import {Routes, Route } from 'react-router-dom'

import Home from './components/Home';
import Questions from './components/Questions';
import Answers from  './components/Answers';
import Dashboard from './components/Dashboard';
import Login from './components/Login';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/questions' element={<Questions/>}/>
        <Route path='/Answers' element={<Answers/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App;
