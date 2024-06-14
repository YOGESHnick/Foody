import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cash, setCash] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/register',{
        name,
        email,
        password,
        cash
      });
      console.log(response);
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  

  return (
    <div className="register">
      <div className="reg">
        <form className="registration" onSubmit={handleSubmit}>
          <input type="text" placeholder="Your Name" value={name} onChange={(event) => setName(event.target.value)} />
          <input type="text" placeholder="Email id" value={email} onChange={(event) => setEmail(event.target.value)} />
          <input type="password" placeholder="Enter password" value={password} onChange={(event) => setPassword(event.target.value)} />
          <input type="text" placeholder="Cash Amount" value={cash} onChange={(event) => setCash(event.target.value)} />
          <button>Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
