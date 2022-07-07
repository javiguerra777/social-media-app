import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderWrapper = styled.nav`
height: 3.5em;
justify-content: space-around;
`;

const Header = () => {
 
  return (
    <HeaderWrapper className='d-flex flex-wrap py-3'>
      <Link to='/media'>Media Posts</Link>
      <Link to='/home'>Profile</Link>
      <Link to='/messages'>Messages</Link>
      <Link to='/menu'>Menu</Link>
    </HeaderWrapper>
  )
}

export default Header