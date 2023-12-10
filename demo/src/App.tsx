import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/Forgot';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/" element={<Register />} />
        // Add other routes as needed
      </Routes>
    </Router>
  );
};

export default App;
