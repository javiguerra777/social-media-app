import React from 'react';
import { AiOutlineHome, AiOutlineMenu } from 'react-icons/ai';
import { FaRegUserCircle } from 'react-icons/fa';
import { TiMessages } from 'react-icons/ti';
import styled from 'styled-components';
import TheLink from './TheLink';

const FooterWrapper = styled.nav`
  background-color: #ffdee9;
  background-image: linear-gradient(0deg, #ffdee9 0%, #b5fffc 100%);
  height: 7vh;
  justify-content: space-evenly;
  position: relative;
  z-index: 1;
  a {
    display: flex;
    flex-direction: column;
    color: #555555;
    text-decoration: none;
    width: 5em;
    text-align: center;
    position: relative;
    top: -1em;
  }
  .active {
    color: #1e90ff;
    border-top: #1e90ff 1px solid;
  }
`;

function Footer() {
  return (
    <FooterWrapper className="d-flex flex-wrap py-3">
      <TheLink to="/media" desc="Media" icon={<AiOutlineHome />} />
      <TheLink to="/home" desc="Profile" icon={<FaRegUserCircle />} />
      <TheLink
        to="/messages"
        desc="Messages"
        icon={<TiMessages />}
      />{' '}
      <TheLink to="/menu" desc="Menu" icon={<AiOutlineMenu />} />
    </FooterWrapper>
  );
}

export default Footer;
