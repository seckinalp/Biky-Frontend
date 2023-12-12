import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/Forgot';
import Post from "./postcomponent/Post"
import Posts from './pages/Posts';
<<<<<<< HEAD
import Profile from './profilecomponent/Profile';
=======
import CreatePost from './createPostComponent/createPost';

>>>>>>> 23ca07c883024e9cb45cfaf912f30e49d0ebb17d


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/posts" element={<Posts></Posts>} />
        <Route path="/post" element={<Post />} /> {/* Updated this line */}
<<<<<<< HEAD
        <Route path='/profile' element={<Profile/>}/>
=======
        <Route path="/create-post" element={<CreatePost/>} /> {/* Updated this line */}
>>>>>>> 23ca07c883024e9cb45cfaf912f30e49d0ebb17d
        // Add other routes as needed
      </Routes>
    </Router>
  );
};

export default App;
