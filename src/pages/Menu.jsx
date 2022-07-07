import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { toggleLoggedIn, updateUser } from '../store/userSlice';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

const MenuWrapper = styled.main`
button {
}
`;
const Menu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = async () => {
    dispatch(toggleLoggedIn());
    dispatch(updateUser("", 0, ""))
    navigate('/');
  };
  return (
    <MenuWrapper>
      <Button onClick={logout}>Logout</Button>
    </MenuWrapper>
  )
}

export default Menu;