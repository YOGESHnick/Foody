import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Diagnose from './pages/Diagnose';
import Register from './pages/Register';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      // console.log(userToken);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/diagnose" element={<Diagnose />} />
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
