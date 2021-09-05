import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {logoutCurrentUser} from '../util/util';
import './Header.css';
import UserContext from './UserContext';

const Header = (props) => {
  const {username} = useContext(UserContext);

  const handleLogout = () => {
    logoutCurrentUser();
  };

  return (
    <div className="header">
      <span>{username ? `Welcome back ${username}` : ''}</span>
      <Link to="/login" className={`log-btn ${username ? 'hide' : ''}`}>
        <span>Login</span>
      </Link>
      <a onClick={handleLogout} className={`log-btn ${username ? '' : 'hide'}`}>
        <span>Logout</span>
      </a>
      <Link to="/signup" className={`sign-btn ${username ? 'hide' : ''}`}>
        <span>Signup</span>
      </Link>
    </div>
  );
};

export default Header;
