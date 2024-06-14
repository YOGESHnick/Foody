import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FoodItem from '../components/FoodItem';

const CartPage = ({ cartItems }) => {
  const [userId, setUserId] = useState('');
  const [userCash, setUserCash] = useState(0);
  

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem('userId');
    if (userIdFromStorage) {
      setUserId(userIdFromStorage);
      fetchUserCash(userIdFromStorage);
    }
  }, []);

  const fetchUserCash = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/auth/user/${userId}/cash`);
      setUserCash(response.data.cash);
    } catch (error) {
      console.error('Error fetching user cash:', error);
    }
  };

  const handleBuyNow = async () => {
    try {
      const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
      const response = await axios.patch(`http://localhost:8080/api/user/${userId}/updateCash`, { cash: userCash - totalPrice });
      setUserCash(response.data.user.cash); // Update local state with updated cash
      // Optionally clear cartItems after successful purchase
    } catch (error) {
      console.error('Error deducting cash:', error);
    }
  };

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      <p>User Cash: {userCash}</p>
      {cartItems.length > 0 ? (
        cartItems.map((food) => (
          <div key={food._id} className="food-item">
            <FoodItem food={food} />
          </div>
        ))
      ) : (
        <p>Cart is empty.</p>
      )}
      <button onClick={handleBuyNow}>Buy Now</button>
    </div>
  );
};

export default CartPage;
