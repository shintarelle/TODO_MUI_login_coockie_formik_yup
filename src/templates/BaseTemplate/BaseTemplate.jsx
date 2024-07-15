import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const BaseTemplate = ({ className = null, children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = Cookies.get('loggedin');
    if (loggedIn === 'true') {
      setIsLoggedIn(true);
    } else {
      navigate('/');
    }
  }, [navigate, isLoggedIn]);

  const handleLogout = () => {
    Cookies.remove('loggedin');
    setIsLoggedIn(false);
  };

  return (
    <main className={className}>
      {isLoggedIn ? (
        <>
          <div
            style={{
              padding: '10px',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '20px',
            }}
          >
            <Button variant="outlined" onClick={handleLogout}>
              LogOut
            </Button>
          </div>
          {children}
        </>
      ) : (
        <h1>Redirecting to login...</h1>
      )}
    </main>
  );
};
export default BaseTemplate;
