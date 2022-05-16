import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/header.css';

const Header = ({authenticateLogin}) => {
  const navigate = useNavigate();
  const logout=()=> {
    localStorage.removeItem('token');
    authenticateLogin();
    navigate('/');
  };
  return (
    <>
    <nav className='d-flex flex-wrap py-3 mb-4 border-bottom'>
    <button onClick={logout}>Logout</button>
      <Link to='/home'>Home</Link>
      <Link to='/media'>Media Posts</Link>
      <Link to='/messages'>Messages</Link>
    </nav>
    </>
  )
}

export default Header