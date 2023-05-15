import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router';
const RegisterPage = () => {

  const history = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async () => {

    console.log(firstName,lastName,email,password,confirmPassword);
    const data = {
      "first_name":firstName,
      "last_name":lastName,
      "email":email,
      "password":password,
      "conf_password":confirmPassword
    };
    const url="http://localhost:3100/register";
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    
    const res = await response.json();
    if(res.message == "Registration Successful"){
      history("/login");
    }
    console.log(res);
  };

  return (
    <div className="login-container">
      <h1 className='main-header'>Register</h1>
      <div  className='login-content'>
        <div  className="input-container">
          <input
           className='login-input'
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder='First Name'
          />
        </div>
        <div className="input-container">
          <input
          className='login-input'
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder='Last Name'
          />
        </div>
        <div className="input-container"> 
          <input
          className='login-input'
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='email'
          />
        </div>
        <div className="input-container">
          <input
          className='login-input'
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='password'
          />
        </div>
        <div className="input-container">
          <input
          className='login-input'
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='confirm password'
          />
        </div>
        <button className="login-btn"  onClick={handleSubmit}>Register</button>
      </div>
    </div>
  );
};

export default RegisterPage;
