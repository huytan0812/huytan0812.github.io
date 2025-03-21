import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Layout } from './layout/Layout.jsx';
import AboutUs from './pages/AboutUs';
import Booking from './pages/Booking';
import Home from './pages/Home';
import Menu from './pages/Menu/Menu';
import Recipe from './pages/Menu/Recipe';
import RecipeList from './pages/Menu/RecipeList';
import News from './pages/News';

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
      </Route>
    </Routes>
  )
}

export default App
