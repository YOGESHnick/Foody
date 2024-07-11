// import React, { useState } from 'react';
// import axios from 'axios';

// const SearchBar = ({ onSearch }) => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleSearch = async (event) => {
//     event.preventDefault();
//     try {
//       const token = localStorage.getItem('userToken');
//       // const response = await axios.post(
//       //   'http://localhost:8080/api/foods/searchFoodByName',
//       //   { name: searchTerm },
//       //   // {
//       //   //   headers: {
//       //   //     Authorization: token ? `Bearer ${token}` : '', 
//       //   //   },
//       //   // }
//       //   {Authorization :token} 
//       // );
//       const response = await fetch(
//         'http://localhost:8080/api/foods/searchFoodByName',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: token,
//           },
//           body: JSON.stringify({ name: searchTerm }),
//         }
//       );
//       console.log(response.data); 
//       onSearch(response.data);
//     } catch (error) {
//       console.error('Error searching for food:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSearch}>
//       <input
//         type="text"
//         placeholder="Search by food name"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <button type="submit">Search</button>
//     </form>
//   );
// };

// export default SearchBar;

import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch(
        'http://localhost:8080/api/foods/searchFoodByName',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify({ name: searchTerm }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        onSearch(data);
      } else {
        console.error('Error searching for food:', response.statusText);
      }
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
