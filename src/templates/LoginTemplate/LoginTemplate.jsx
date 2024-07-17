import React from 'react';

function LoginTemplate({ children }) {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </div>
  );
}

export default LoginTemplate;
