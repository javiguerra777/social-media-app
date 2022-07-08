import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import JsonRoutes from '../json/routes.json';
const HeaderWrapper = styled.nav`
height: 7vh;
justify-content: space-evenly;
position:relative;
a {
  color: #555555;
  text-decoration: none;
  width: 5em;
  text-align:center;
}
.active {
  color: blue;
  border-bottom: blue 1px solid;
}
`;

const Header = () => {
  const {pathname} = useLocation();
  return (
    <HeaderWrapper className='d-flex flex-wrap py-3'>
      {JsonRoutes.map((route) => {
        return (
          <Link className={pathname === route.to ? 'active' : ''} to={route.to}>{route.desc}</Link>
        )
      })}
    </HeaderWrapper>
  )
}

export default Header