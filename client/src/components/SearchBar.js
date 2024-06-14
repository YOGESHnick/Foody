import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.post(
        'http://localhost:8080/api/foods/searchFoodByName',
        { name: searchTerm }
      );
      console.log(response.data); 
      onSearch(response.data);
    } catch (error) {
      console.error('Error searching for food:', error);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search by food name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
