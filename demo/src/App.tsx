import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/Forgot';
import Post from "./postcomponent/Post"
import Posts from './pages/Posts';
import Profile from './profilecomponent/Profile';
import CreatePost from './createPostComponent/CreatePost';
import Settings from './settingsComponent/Settings';
import { imageLink } from './logic/backend';
import Notifications from './notificationComponent/Notifications';




const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/posts" element={<Posts></Posts>} />
        <Route path="/post" element={<Post/>} /> {/* Updated this line */}
        <Route path="/create-post" element={<CreatePost/>} /> {/* Updated this line */}
        <Route path="/settings" element={<Settings/>} /> {/* Updated this line */}
        <Route path="/notifications" element={<Notifications notifications={[  { id: 1, time: '9:01 am', userName: 'Ahmet', text: 'followed you.', isSeen: false },
    { id: 2, time: '9:03 am', userName: 'Ayşe', text: 'liked your post.', isSeen: true },
    { id: 3, time: '9:07 am', userName: 'Mehmet', text: 'commented: Great work!', isSeen: false },]}/>} /> {/* Updated this line */}
        <Route path='/profile' element={<Profile />}/>
      </Routes>
    </Router>
  );
};

export default App;
