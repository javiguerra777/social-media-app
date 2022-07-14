import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function TheLink({ to, desc, icon }) {
  const { pathname } = useLocation();
  return (
    <Link className={pathname === to ? 'active' : ''} to={to}>
      <section>{icon}</section>
      <section>{desc}</section>
    </Link>
  );
}

export default TheLink;
