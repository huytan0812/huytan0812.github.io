import { ShoppingCartOutlined } from '@ant-design/icons';
import { Flex } from 'antd';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useThemeContext } from '../contexts/ThemeContext.jsx';

const NavBar = () => {
  const value = useThemeContext();

  if (value.theme === 'dark') {
    return (
      <Flex justify="space-between" 
            style={
              { padding: '10px 20px 10px 20px', 
                borderBottom: '1px solid white',
                backgroundColor: 'black',
                color: 'white'
              }
            }
      >
          <NavLink to='/' end>Trang chủ</NavLink>
          <NavLink to='/menu'>Menu</NavLink>
          <NavLink to='/about_us'>Về chúng tôi</NavLink>
          <NavLink to='/booking'>Đặt bàn ngay</NavLink>
          <NavLink to='/login'>Đăng nhập</NavLink>
          <NavLink to='/cart'>
            Giỏ hàng
            <ShoppingCartOutlined 
              style={{
                fontSize: '20px',
                color: 'white'
              }}
            />
          </NavLink>
      </Flex>
    )
  }

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
        <NavLink to='/login'>Đăng nhập</NavLink>
        <NavLink to='/user_list'>Danh sách user</NavLink>
        <NavLink to='/booking'>Đặt bàn ngay</NavLink>
        <NavLink to='/cart'>
          Giỏ hàng
          <ShoppingCartOutlined 
            style={{
              fontSize: '20px',
              color: 'black'
            }}
          />
        </NavLink>
    </Flex>
  )
}

export default NavBar