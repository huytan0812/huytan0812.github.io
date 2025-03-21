import React from 'react';
import NavBar from '../components/NavBar';
import { Outlet } from 'react-router-dom';
import { useState, useContext, createContext } from 'react';

const ThemeContext = createContext();

const Layout = () => {
  const [theme, setTheme] = useState("light");

  return (
    <React.Fragment>
      <ThemeContext.Provider value={{ 'theme': theme, 'setTheme': setTheme }}>
        <NavBar />
        <Outlet />
      </ThemeContext.Provider>
    </React.Fragment>
  )
}

export { Layout, ThemeContext };