import axios from 'axios';
import React, {SyntheticEvent, useContext, useState} from 'react';
import {useHistory} from 'react-router-dom';
import UserContext from './UserContext';

const Login = (props) => {
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [errorMsg, setErorrMsg] = useState('');

  const handleUsername = (e:SyntheticEvent<HTMLInputElement>) => {
    setUsernameValue(e.currentTarget.value);
  };
  const handlePassword = (e:SyntheticEvent<HTMLInputElement>) => {
    setPasswordValue(e.currentTarget.value);
  };

  const {setUsername} = useContext(UserContext);
  const history = useHistory();
  const submit = () => {
    setErorrMsg('');
    const data = {
      username: usernameValue.trim(),
      password: passwordValue.trim(),
    };
    axios.post('/api/login', data).then((res) => {
      const data = res.data;
      if (data.username) {
        setUsername(data.username);
        history.push('/');
      } else if (data.error) {
        setErorrMsg(data.error);
      }
    }).catch((err) => {
      setErorrMsg(err.toString());
    });
  };

  return (
    <div className="wrapper">
      <h2>Login</h2>
      <div className="dialog">
        <label>Username</label>
        <input onChange={handleUsername}></input>
        <label>Password</label>
        <input type="password" onChange={handlePassword}></input>
        <p className={`warning ${errorMsg ? '': 'hide'}`}>{errorMsg}</p>
        <button onClick={submit}>Login</button>
      </div>
    </div>
  );
};

export default Login;
