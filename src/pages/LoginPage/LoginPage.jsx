import React, { useEffect } from 'react';
import LoginForm from '../../components/LoginForm';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import LoginTemplate from '../../templates/LoginTemplate';

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
    <LoginTemplate>
      <LoginForm />
    </LoginTemplate>
  );
}

export default Login;
