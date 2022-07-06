import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux/es/exports';
const Layout = () => {
  const user = useSelector((state)=> state.user);
  return (
    <>
    {user.loggedIn && <Header />}
    <Outlet/>
      {user.loggedIn && <Footer />}
    </>
  )
}

export default Layout;