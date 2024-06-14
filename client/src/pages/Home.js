import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import FoodItem from '../components/FoodItem';
import { Link } from 'react-router-dom';
import '../App.css';

const Home = ({ onAddToCart }) => {
  const [foods, setFoods] = useState([]);

  const handleAddToCartLocal = (food) => {
    onAddToCart(food);
  };

  const handleSearch = (searchResults) => {
    setFoods(searchResults);
  };

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
