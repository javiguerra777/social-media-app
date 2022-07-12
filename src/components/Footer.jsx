import React from 'react';
import TheLink from './TheLink';
import { AiOutlineHome, AiOutlineMenu } from 'react-icons/ai';
import { FaRegUserCircle } from 'react-icons/fa';
import { TiMessages } from 'react-icons/ti';
import styled from 'styled-components';
const FooterWrapper = styled.nav`
background-color: #FFDEE9;
background-image: linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%);
height: 7vh;
justify-content: space-evenly;
position:relative;
z-index: 1;
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
  border-top: blue 1px solid;
}
`;


const Footer = () => {
  return (
     <FooterWrapper className='d-flex flex-wrap py-3'>
      <TheLink to={"/media"} desc={"Media"} icon={<AiOutlineHome />} />
      <TheLink to={"/home"} desc={"Profile"} icon={<FaRegUserCircle />} />
       <TheLink to={"/messages"} desc={"Messages"} icon={<TiMessages />} /> <TheLink to={"/menu"} desc={"Menu"} icon={<AiOutlineMenu />} />
    </FooterWrapper>
  )
}

export default Footer;