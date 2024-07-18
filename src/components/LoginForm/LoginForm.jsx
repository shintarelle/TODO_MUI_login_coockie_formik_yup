import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = e => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);

    const hardcodedEmail = 'demo@login.com';
    const hardcodedPassword = 'adminadmin';

    if (email === hardcodedEmail && password === hardcodedPassword) {
      Cookies.set('loggedin', 'true');
      navigate('/home');
      setEmail('');
      setPassword('');
    } else {
      setError('Invalid login or password');
    }
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '300px',
        margin: '0 auto',
      }}
      onSubmit={handleLogin}
    >
      <TextField
        label="Email"
        variant="outlined"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      {error && <Box sx={{ color: 'red' }}>{error}</Box>}
      <Button type="submit" variant="contained" color="primary">
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
