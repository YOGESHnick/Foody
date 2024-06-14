// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {useGetUserId} from '../hooks/useGetUserId';
// import axios from "axios";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const userId=useGetUserId();

//   // console.log(userId);

//   const loginHandler = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:8080/api/auth/login", {
//         email,
//         password,
//       });
//       console.log(response);// send _id in response 
//       // console.log(response.data.userToken);
//       const token = response.data.userToken;
//       const userId = response.data.userId; 

//       // Store token in localStorage, but store aagala....but works #1. IF IT WORKS, DON'T TOUCH IT
//       localStorage.setItem('userId', userId);
//       localStorage.setItem('userToken', token);
//       navigate("/home");

//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="login">
//       <div className="form">
//         <div className="left">
//           <h3>Foody</h3>
//         </div>
//         <form onSubmit={loginHandler}>
//           <input type="text" placeholder="Email id" value={email} onChange={(event) => setEmail(event.target.value)} />
//           <input type="password" placeholder="Enter password" value={password} onChange={(event) => setPassword(event.target.value)} />
//           <button>Login</button>
//           <br />
//           <p className="newUser" >Need instant Food? <a className="newUser" href="/register"> Join us </a></p>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if userToken exists in localStorage
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      navigate("/home"); // Redirect to home if token exists
    }
  }, [navigate]);

  const loginHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });

      const token = response.data.userToken;
      const userId = response.data.userId;

      localStorage.setItem('userId', userId);
      localStorage.setItem('userToken', token);

      navigate("/home");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login">
      <div className="form">
        <div className="left">
          <h3>Foody</h3>
        </div>
        <form onSubmit={loginHandler}>
          <input type="text" placeholder="Email id" value={email} onChange={(event) => setEmail(event.target.value)} />
          <input type="password" placeholder="Enter password" value={password} onChange={(event) => setPassword(event.target.value)} />
          <button>Login</button>
          <br />
          <p className="newUser">Need instant Food? <a className="newUser" href="/register"> Join us </a></p>
        </form>
      </div>
    </div>
  );
}

export default Login;
