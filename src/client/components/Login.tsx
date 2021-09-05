import axios from 'axios';
import React, {SyntheticEvent, useState} from 'react';
import {useHistory} from 'react-router-dom';

const Login = (props) => {
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [errorMsg, setErorrMsg] = useState('');
  const history = useHistory();

  const handleUsername = (e:SyntheticEvent<HTMLInputElement>) => {
    setUsernameValue(e.currentTarget.value);
  };
  const handlePassword = (e:SyntheticEvent<HTMLInputElement>) => {
    setPasswordValue(e.currentTarget.value);
  };

  const submit = () => {
    setErorrMsg('');
    const data = {
      username: usernameValue.trim(),
      password: passwordValue.trim(),
    };
    axios.post('/api/login', data).then((res) => {
      const data = res.data;
      if (data.username) {
        history.push('/mypage');
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
