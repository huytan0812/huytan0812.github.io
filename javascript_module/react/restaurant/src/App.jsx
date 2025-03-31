import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Layout } from './layout/Layout.jsx';
import AboutUs from './pages/AboutUs';
import Booking from './pages/Booking';
import { Cart } from './pages/Cart.jsx';
import Home from './pages/Home';
import Login from './pages/Login';
import Menu from './pages/Menu/Menu';
import Recipe from './pages/Menu/Recipe';
import RecipeList from './pages/Menu/RecipeList';
import News from './pages/News';
import UserList from './pages/UserList.jsx';
import Logout from './pages/logout.jsx';

function App() {
  return (
    <Routes>
      <Route path='/' element = {<Layout />}>
        <Route index element = {<Home />} />
        <Route path='/menu' element = {<Menu />}>
          <Route index element = {<RecipeList />} />
          <Route path=':recipeId' element = {<Recipe />} />
        </Route>
        <Route path='/about_us' element = {<AboutUs />} />
        <Route path='/news' element = {<News />} />
        <Route path='/booking' element = {<Booking />} />
        <Route path='/cart' element = {<Cart />} />
        <Route path='/login' element = {<Login />} />
        <Route path='/logout' element = {<Logout />} />
        <Route path='/user_list' element = {<UserList />} />
      </Route>
    </Routes>
  )
}

export default App
