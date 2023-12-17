import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Homepage from './Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/Forgot';
import { Provider } from 'react-redux';
import store from './store'; 
import Profile from './profilecomponent/Profile';
import Feed from './postcomponent/Feed';
import './App.css'
import CreatePost from './createPostComponent/CreatePost';

const App = () => {
  
return (
  
  <Provider store={store}>
    <Router>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/homepage" element={<Homepage> <Feed /></Homepage>} />
        <Route path='/profile/:userID' element={<Homepage><Profile /></Homepage>}/>
        <Route path='/feed' element={<Homepage><Feed /></Homepage>}/>
        <Route path='/create' element={<Homepage>  <CreatePost onClose={function (): void {
          throw new Error('Function not implemented.');
        } } /></Homepage>}/>
        <Route path="/*" element={<div>404 not found</div>} />
     
        </Routes>
    </Router>
  </Provider>
);
};

export default App;
