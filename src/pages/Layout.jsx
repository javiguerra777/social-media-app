import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import context from '../context/context';
const Layout = () => {
const {loggedin, authenticateLogin} = useContext(context);
  return (
    <>
    {loggedin && <Header authenticateLogin={authenticateLogin} />}
    <Outlet/>
    {loggedin && <Footer/>}
    </>
  )
}

export default Layout;