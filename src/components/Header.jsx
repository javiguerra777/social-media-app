import React from 'react';
import TheLink from './TheLink';
import { AiOutlineHome, AiOutlineMenu } from 'react-icons/ai';
import { FaRegUserCircle } from 'react-icons/fa';
import { TiMessages } from 'react-icons/ti';
import styled from 'styled-components';
const HeaderWrapper = styled.nav`
height: 7vh;
justify-content: space-evenly;
position:relative;
a {
  display: flex;
  flex-direction: column;
  color: #555555;
  text-decoration: none;
  width: 5em;
  text-align:center;
  position: relative;
  top:-1em;
}
.active {
  color: blue;
  border-bottom: blue 1px solid;
}
`;

const Header = () => {
  
  return (
    <HeaderWrapper className='d-flex flex-wrap py-3'>
      <TheLink to={"/media"} desc={"Media"} icon={<AiOutlineHome />} />
      <TheLink to={"/home"} desc={"Profile"} icon={<FaRegUserCircle />} />
       <TheLink to={"/messages"} desc={"Messages"} icon={<TiMessages />} /> <TheLink to={"/menu"} desc={"Menu"} icon={<AiOutlineMenu />} />
    </HeaderWrapper>
  )
}

export default Header;