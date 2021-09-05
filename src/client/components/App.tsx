import React, {useState} from 'react';
import {Route} from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import UserContext from './UserContext';


const APP = (props) => {
  const [username, setUsername] = useState('');
  const contextValue = {username, setUsername};

  return (
    <UserContext.Provider value={contextValue}>
      <Header />
      <Route exact path="/(|mypage)"><Home /></Route>
      <Route path="/login"><Login /></Route>
      <Route path="/signup"><Signup /></Route>
    </UserContext.Provider>
  );
};

export default APP;
