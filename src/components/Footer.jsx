import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  display: flex;
  justify-content: space-evenly;
  position: fixed;
  bottom: 0;
  height: 5vh;
  width: 100%;
`;

const Footer = () => {
  return (
    <FooterWrapper className='footer text-center text-lg-start bg-light text-muted'>
    <div>
      2022 copyright
    </div>
    </FooterWrapper>
  )
}

export default Footer