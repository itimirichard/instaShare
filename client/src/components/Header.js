import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Header = ({ token }) => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const links = [
      !token && { label: 'Sign Up', path: '/signup' },
      !token && { label: 'Sign In', path: '/signin' },
      token && { label: 'Upload', path: '/upload' },
      token && { label: 'Files', path: '/files' },
      token && { label: 'Sign Out', path: '/signout' },
    ]
      .filter((link) => link)
      .map(({ label, path }) => (
        <NavLink
          key={path}
          className='nav-link'
          activeClassName='active'
          to={path}
          exact={true}
        >
          {label}
        </NavLink>
      ));

    setLinks(links);
  }, [token]);

  return (
    <div className='header'>
      <nav className='navbar navbar-light bg-light'>
        <NavLink
          className='navbar-brand'
          activeClassName='active'
          to='#'
          exact={true}
        >
          Instashare
        </NavLink>
        <div className='d-flex justify-content-end'>
          <ul className='nav d-flex align-items-center'>{links}</ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
