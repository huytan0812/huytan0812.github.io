import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import AboutUs from './pages/AboutUs';
import News from './pages/News';
import Booking from './pages/Booking';

function App() {

  return (
    <Routes>
      <Route path='/' element = {<Layout />}>
        <Route index element = {<Home />} />
        <Route path='/menu' element = {<Menu />} />
        <Route path='/about_us' element = {<AboutUs />} />
        <Route path='/news' element = {<News />} />
        <Route path='/booking' element = {<Booking />} />
      </Route>
    </Routes>
  )
}

export default App
