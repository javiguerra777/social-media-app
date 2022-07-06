import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/header.css';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { toggleLoggedIn, updateUser } from '../store/userSlice';

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const logout = async () => {
    dispatch(toggleLoggedIn());
    dispatch(updateUser("", 0, ""))
    navigate('/');
  };
  return (
    <div>
    <nav className='d-flex flex-wrap py-3 mb-4 border-bottom'>
    <button onClick={logout}>Logout</button>
      <Link to='/home'>Home</Link>
      <Link to='/media'>Media Posts</Link>
      <Link to='/messages'>Messages</Link>
    </nav>
    </div>
  )
}

export default Header