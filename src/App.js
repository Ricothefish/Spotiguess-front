import Login from './Login.js'
import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard.js'
import useAuth from './UseAuth.js';
import './app.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider, AuthContext } from './AuthContext';

function App() {

  const code = new URLSearchParams(window.location.search).get('code');
  const accessToken =  useAuth(code);
  const script = document.createElement('script');
  script.src = 'https://sdk.scdn.co/spotify-player.js';
  script.async = true;
  document.body.appendChild(script);
  
  

  return (

    <Router>

        {accessToken ? <Dashboard accessToken={accessToken}/> : <Login />
        }

    </Router>


  );
}


export default App;
