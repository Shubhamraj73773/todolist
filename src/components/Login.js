import React, { useState } from 'react';
import './Login.css'; 
import { useNavigate } from 'react-router';


const LoginPage = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError] = useState(null);

  const history = useNavigate();

  const handleLogin = async () => {
    // Perform login logic here
    console.log('Username:', username);
    console.log('Password:', password);

    setError(null);

    const data = {
      email:username,
      password:password
    };
    const url="http://localhost:3100/login";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    const res = await response.json();
    console.log(res);
    if(res.message == "Login successful!"){
      props.setCookie(res.jwt);
      history("/");
    }
  }

  return (
    <div className="login-container">
      <h1 className='main-header'>Login</h1>
      <div className='login-content'>
        <div className="input-container">
          <input
            className='login-input'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username'
          />
        </div>
        <div className="input-container">
          <input
            className='login-input'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter password'
          />
        </div>
        <button type="button" className="login-btn" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
