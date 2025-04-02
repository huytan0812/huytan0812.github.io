import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { CartProvider } from '../contexts/CartContext.jsx';
import { ThemeProvider } from '../contexts/ThemeContext.jsx';
import { useAuthContext } from '../contexts/AuthContext.jsx';

const Layout = () => {
  const { user, logout } = useAuthContext();

  return (
    <React.Fragment>
      <CartProvider>
        <ThemeProvider>
          <NavBar />
          { user && <h1 style={{ textAlign: 'center' }}>Xin chào, { user.firstName } { user.lastName }</h1>}
          <Outlet />
        </ThemeProvider>
      </CartProvider>
    </React.Fragment>
  )
}

export { Layout };

