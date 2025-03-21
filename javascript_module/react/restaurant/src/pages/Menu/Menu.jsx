import React from 'react';
import { Outlet } from 'react-router-dom';

const Menu = () => {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  )
}

export default Menu