// import React, { useState } from 'react';
// import SearchBar from '../components/SearchBar';
// import FoodItem from '../components/FoodItem';
// import { Link } from 'react-router-dom';
// import '../App.css';

// const Home = ({ onAddToCart }) => {
//   const [foods, setFoods] = useState([]);

//   const handleAddToCartLocal = (food) => {
//     onAddToCart(food);
//   };

//   const handleSearch = (searchResults) => {
//     setFoods(searchResults);
//   };

//   return (
//     <div className="home-container">
//       <div className="topBar">
//         <h1>Home</h1>
//         <Link to="/cart" className="cart-link">Go to Cart</Link>
//       </div>
//       <SearchBar onSearch={handleSearch} />
//       <div className="foods-container">
//         {foods.length > 0 ? (
//           foods.map((food) => (
//             <div key={food._id} className="food-item">
//               <FoodItem food={food} />
//               <button className="add-to-cart-btn" onClick={() => handleAddToCartLocal(food)}>Add to Cart</button>
//             </div>
//           ))
//         ) : (
//           <p>No food items found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;

// import React, { useState, useEffect } from 'react';
// import { Link, Navigate } from 'react-router-dom';
// import SearchBar from '../components/SearchBar';
// import FoodItem from '../components/FoodItem';
// import '../App.css';

// const Home = ({ onAddToCart }) => {
//   const [foods, setFoods] = useState([]);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [loading, setLoading] = useState(true); // Add loading state

//   useEffect(() => {
//     const userToken = localStorage.getItem('userToken');
//     if (userToken) {
//       verifyToken(userToken);
//     } else {
//       setIsLoggedIn(false); // If no userToken is present, set isLoggedIn to false
//       setLoading(false); 
//     }
//   }, []);

//   const verifyToken = async (token) => {
//     try {
//       const response = await fetch('http://localhost:8080/api/auth/verifyToken', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: token,
//         },
//       });
//       if (response.ok) {
//         setIsLoggedIn(true);
//       } else {
//         setIsLoggedIn(false);
//         localStorage.removeItem('userToken');
//       }
//     } catch (error) {
//       console.error('Error verifying token:', error);
//       setIsLoggedIn(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddToCartLocal = (food) => {
//     onAddToCart(food);
//   };

//   const handleSearch = (searchResults) => {
//     setFoods(searchResults);
//   };

//   // // Render loading state while verifying token
//   // if (loading) {
//   //   return <p>Loading...</p>;
//   // }

//   // If not logged in, navigate to the login page
//   if (!isLoggedIn) {
//     return <Navigate to="/login" />;
//   }

//   return (
//     <div className="home-container">
//       <div className="topBar">
//         <h1>Home</h1>
//         <Link to="/cart" className="cart-link">Go to Cart</Link>
//       </div>
//       <SearchBar onSearch={handleSearch} />
//       <div className="foods-container">
//         {foods.length > 0 ? (
//           foods.map((food) => (
//             <div key={food._id} className="food-item">
//               <FoodItem food={food} />
//               <button className="add-to-cart-btn" onClick={() => handleAddToCartLocal(food)}>Add to Cart</button>
//             </div>
//           ))
//         ) : (
//           <p>No food items found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import FoodItem from '../components/FoodItem';
import '../App.css';

const Home = ({ onAddToCart }) => {
  const [foods, setFoods] = useState([]); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Introduce loading state

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      verifyToken(userToken);
    } else {
      setIsLoggedIn(false); // If no userToken is present, set isLoggedIn to false
      setLoading(false); // Set loading to false when userToken is absent
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
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        localStorage.removeItem('userToken');
      }
      setLoading(false); // Set loading to false after verification
    } catch (error) {
      console.error('Error verifying token:', error);
      setIsLoggedIn(false);
      setLoading(false); // Set loading to false on error
    }
  };

  const handleAddToCartLocal = (food) => {
    onAddToCart(food);
  };

  const handleSearch = (searchResults) => {
    setFoods(searchResults);
  };

  if (loading) {
    return <p>Loading...</p>; // Render loading state while verifying token
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="home-container">
      <div className="topBar">
        <h1>Home</h1>
        <Link to="/cart" className="cart-link">Go to Cart</Link>
      </div>
      <SearchBar onSearch={handleSearch} />
      <div className="foods-container">
        {foods.length > 0 ? (
          foods.map((food) => (
            <div key={food._id} className="food-item">
              <FoodItem food={food} />
              <button className="add-to-cart-btn" onClick={() => handleAddToCartLocal(food)}>Add to Cart</button>
            </div>
          ))
        ) : (
          <p>No food items found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;