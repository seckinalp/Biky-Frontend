import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/Forgot';
import Post from "./postcomponent/Post"
import Posts from './pages/Posts';
import Profile from './profilecomponent/Profile';
import CreatePost from './createPostComponent/createPost';




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
        <Route path="/create-post" element={<CreatePost/>} /> {/* Updated this line */}
        <Route path='/profile' element={<Profile item={{
          userId: '54545',
          universityId: '546546',
          username: 'dedelermemo',
          email: '.bilkent.edu.tr',
          password: 'sdasd',
          postNum: '9',
          following: '20',
          followers: '17',
          likes: '3',
          bioInfo: 'Cs Stundent'
        }}/>}/>
      </Routes>
    </Router>
  );
};

export default App;
