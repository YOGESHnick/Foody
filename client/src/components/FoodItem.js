import React from 'react';

const FoodItem = ({ food }) => {
  return (
    <div className="food-item">
      <div className="food-image">
        {food.image && <img src={food.image} alt={food.name} />}
        {!food.image && <div className="placeholder-image">No Image Available</div>}
      </div>
      <div className="food-details">
        <h3>{food.name}</h3>
        <p>Price: ₹{food.price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
