import React from 'react';
import LoginForm from '../components/LoginForm';

function Login() {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <LoginForm />
    </div>
  );
}

export default Login;
