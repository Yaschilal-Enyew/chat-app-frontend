// App.jsx
import React, { useContext } from 'react';
import {Navigate, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import ResetPassword from './pages/ResetPassword';

import { Toaster } from "react-hot-toast";
import { AuthContext } from '../context/AuthContext';
import ChatContainer from './components/ChatContainer';

const App = () => {
  const {authUser} = useContext(AuthContext);
  return (
    <>
    <section className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* GLOBAL BLUR GRADIENTS (same as signup.jsx) */}
      <div className="absolute top-12 left-1/4 w-72 h-72 bg-amber-300 rounded-full opacity-20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 w-80 h-80 bg-yellow-400 rounded-full opacity-16 blur-3xl pointer-events-none" />
      <Toaster />
      <Routes>
        <Route path="/" element={ authUser ?  <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={ <ChatContainer />} />
        <Route path="/login" element={ !authUser ? <LoginPage /> : <Navigate to="/" /> } /> 
        <Route path="/profile" element={ authUser ?  <ProfilePage /> : <Navigate to="/" />} />
        <Route path="/reset-password" element={ !authUser ?  <ResetPassword /> : <Navigate to="/" />} />

      </Routes>
      </section>
    </>
  )
}
export default App;
