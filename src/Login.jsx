import React, { useState } from 'react';
import { Button, Typography, message} from 'antd';
import TextInput from './components/TextInput';
import { useNavigate } from 'react-router-dom';
import { loginUser } from './services/loginservices';

function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
  const handleChangeInput = (value, type) => {
    if (type === 'Email') setEmail(value);
    if (type === 'Password') setPassword(value);
    console.log(value);
  };

  const handleLogin= async() =>{
    if(!email || !password){
      message.error("Please fill in all fields");
      return;
    }
    try{
      const data = await loginUser(email,password)
      const msg = data?.message || "Login successful";
      message.success(msg);
      localStorage.setItem('username', data.user.username);
      localStorage.setItem('emp_id', data.user.emp_id);
      navigate('/home');
      
     }
     catch (err) {
      message.error(err.error || 'Login failed');
     }
    
  }

    return (
       <>
       <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        flexDirection: 'column',
        padding: '1rem',
      }}
    >
      <div style={{ width: '100%', maxWidth: '400px', background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <h1>Login</h1>

      <TextInput
        label="Email"
        name="email"
        placeholder="Enter email"
        onChange={(e) => handleChangeInput(e.target.value, 'Email')}
      />

      <TextInput
        label="Password"
        name="password"
        placeholder="Enter password"
        password
        onChange={(e) => handleChangeInput(e.target.value, 'Password')}
        extra={
            <Typography.Link onClick={() => navigate('/forgot-pswd')}>
              Forgot Password?
            </Typography.Link>
          }
      />

      <Button type="primary" onClick={handleLogin} >Login </Button>
      </div>
      </div>
    </>
  );
}
export default Login
