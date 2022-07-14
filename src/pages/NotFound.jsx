import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundWrapper = styled.main`
  display: flex;
  flex-direction: column;
  #notloggedin {
    display: flex;
    justify-content: space-evenly;
  }
  .notfound-main {
    text-align: center;
  }
`;

function NotFound() {
  const loggedin = useSelector((state) => state.user.loggedin);
  return (
    <NotFoundWrapper>
      {!loggedin && (
        <header id="notloggedin">
          <Link to="/">Have a profile? Click Here</Link>
          <Link to="signup">Do not have a profile? Click Here</Link>
        </header>
      )}
      <section className="notfound-main">
        <h2>404: Page Not Found!</h2>
      </section>
    </NotFoundWrapper>
  );
}

export default NotFound;
