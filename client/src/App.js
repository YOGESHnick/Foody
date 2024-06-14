import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      console.log(userToken);
      verifyToken(userToken);
      setIsLoggedIn(true);
    } else {
      console.log(userToken);
      setIsLoggedIn(false);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await fetch('/api/auth/verifyToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      console.log(response);
      if (response.status === 200) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        localStorage.removeItem('userToken'); 
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      setIsLoggedIn(false);
    }
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/" />} /> */}
          {/*  Next line is needed, commented out for D E V E L O P M E N T   P U R P O S E S */}
          {/* <Route
            path="/diagnose"
            element={isLoggedIn ? <Diagnose /> : (<Navigate to="/" />)}
          /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
