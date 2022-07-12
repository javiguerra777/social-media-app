import React from 'react';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux/es/exports';
const Layout = () => {
  const user = useSelector((state)=> state.user);
  return (
    <main>
      <Outlet/>
      {user.loggedIn && user.displayFooter && <Footer />}
    </main>
  )
}

export default Layout;