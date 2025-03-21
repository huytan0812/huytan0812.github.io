import React from 'react';
import { NavLink } from 'react-router-dom';
import { Flex } from 'antd';

const NavBar = () => {
  return (
    <Flex justify="space-between" 
          style={
            { padding: '10px 20px 10px 20px', 
              borderBottom: '1px solid black',
           }
          }
    >
        <NavLink to='/' end>Trang chủ</NavLink>
        <NavLink to='/menu'>Menu</NavLink>
        <NavLink to='/about_us'>Về chúng tôi</NavLink>
        <NavLink to='/news'>Tin tức</NavLink>
        <NavLink to='/booking'>Đặt bàn ngay</NavLink>
    </Flex>
  )
}

export default NavBar