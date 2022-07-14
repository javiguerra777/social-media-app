import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux/es/exports';
import Footer from '../components/Footer';

function Layout() {
  const user = useSelector((state) => state.user);
  return (
    <main>
      <Outlet />
      {user.loggedIn && user.displayFooter && <Footer />}
    </main>
  );
}

export default Layout;
