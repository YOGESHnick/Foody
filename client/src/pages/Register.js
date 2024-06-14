import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import avatar from '../assets/profile.png'

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

const Register = () => {
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const imageRef = ref(storage, `images/${profileImage.name + v4()}`);
      await uploadBytes(imageRef, profileImage);
      const imageUrl = await getDownloadURL(imageRef);
      console.log(imageUrl);

      const response = await axios.post('http://localhost:8080/api/auth/register',{
        name,
        profileImage:imageUrl,
        email,
        password,
      });
      console.log(response);
      navigate("/diagnose");
    } catch (error) {
      console.error(error);
    }
  };

  

  return (
    <div className="register">
      <div className="reg">
        <form className="registration" onSubmit={handleSubmit}>

          <label htmlFor="file-upload" className='custom-file-upload'>
            <img src={avatar||profileImage} alt="" />
          </label>
          <input 
            className="reg"
            type="file"
            lable="Image"
            name="myFile"
            id='file-upload'
            accept='.jpeg, .png, .jpg'
            onChange={(event) => setProfileImage(event.target.files[0])}
          />

          <input type="text" placeholder="Your Name" value={name} onChange={(event) => setName(event.target.value)} />
          <input type="text" placeholder="Email id" value={email} onChange={(event) => setEmail(event.target.value)} />
          <input type="password" placeholder="Enter password" value={password} onChange={(event) => setPassword(event.target.value)} />
          <button>Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
