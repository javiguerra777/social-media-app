import React from 'react';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux/es/exports';
const Layout = () => {
  const user = useSelector((state)=> state.user);
  return (
    <>
      <Outlet/>
      {user.loggedIn && <Footer />}
    </>
  )
}

export default Layout;