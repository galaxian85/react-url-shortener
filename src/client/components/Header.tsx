import axios from 'axios';
import React, {useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';
import './Header.css';
import UserContext from './UserContext';

const Header = (props) => {
  const {username, setUsername} = useContext(UserContext);
  const history = useHistory();

  const handleLogout = () => {
    setUsername('');
    axios.delete('/api/member');
    history.push('/');
  };

  return (
    <div className="header">
      <span>{username ? `Welcome back ${username}` : ''}</span>
      <Link to="/login" className={`log-btn ${username ? 'hide' : ''}`}>
        <span>Login</span>
      </Link>
      <a onClick={handleLogout} className={`log-btn ${username ? '' : 'hide'}`}
        href="#">
        <span>Logout</span>
      </a>
      <Link to="/signup" className={`sign-btn ${username ? 'hide' : ''}`}>
        <span>Signup</span>
      </Link>
    </div>
  );
};

export default Header;
