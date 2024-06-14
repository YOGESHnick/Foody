// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false); // Introduce loading state
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check if userToken exists in localStorage
//     const userToken = localStorage.getItem('userToken');
//     if (userToken) {
//       navigate("/home"); // Redirect to home if token exists
//     }
//   }, [navigate]);

//   const loginHandler = async (event) => {
//     event.preventDefault();
//     setLoading(true); // Start loading

//     try {
//       const response = await axios.post("http://localhost:8080/api/auth/login", {
//         email,
//         password,
//       });

//       const token = response.data.userToken;
//       const userId = response.data.userId;

//       localStorage.setItem('userId', userId);
//       localStorage.setItem('userToken', token);

//       navigate("/home");

//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false); // Stop loading
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
//           <p className="newUser">Need instant Food? <a className="newUser" href="/register"> Join us </a></p>
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
  const [loading, setLoading] = useState(false); // Introduce loading state
  const navigate = useNavigate();

  useEffect(() => {
    // Check if userToken exists in localStorage
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      navigate("/home"); // Redirect to home if token exists
    }
  }, [navigate]); // Ensure useEffect runs only once with []

  const loginHandler = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading

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
    } finally {
      setLoading(false); // Stop loading
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
