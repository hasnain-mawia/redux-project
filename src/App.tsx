import './App.css';
import { Outlet } from 'react-router-dom';
import { ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import SlideCart from './components/SlideCart';
import { useState } from 'react';

function App() {
  const isLogin = localStorage.getItem('isLogin');
  return (
    <>
    <Header />
    <Outlet/>
    <ToastContainer/>
    {isLogin ? <SlideCart/> : null}
    </>
  );
}

export default App;
