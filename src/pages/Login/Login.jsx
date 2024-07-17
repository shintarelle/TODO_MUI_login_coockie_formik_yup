import React, { useEffect } from 'react';
import LoginForm from '../../components/LoginForm';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const loggedIn = Cookies.get('loggedin');

  useEffect(() => {
    if (loggedIn === 'true') {
      navigate('/home');
    } else {
      navigate('/');
    }
  }, [loggedIn, navigate]);

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
