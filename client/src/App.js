import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import CartPage from './pages/CartPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  // const userTokenFromStorage = localStorage.getItem('userToken');
  // console.log(userTokenFromStorage);

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      setIsLoggedIn(true);
      verifyToken(userToken);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/verifyToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      if (response.ok) {
        console.log(token);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      setIsLoggedIn(false);
    }
  };

  const handleAddToCart = (food) => {
    if (!cartItems.find(item => item._id === food._id)) {
      setCartItems([...cartItems, food]);
    }
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={ isLoggedIn ? <Home onAddToCart={handleAddToCart} /> : <Navigate to="/login" /> } />
          <Route path="/home" element={<Home onAddToCart={handleAddToCart} />} />
          <Route path="/cart" element={<CartPage cartItems={cartItems} />} />
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
