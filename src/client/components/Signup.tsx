import axios from 'axios';
import React, {SyntheticEvent, useContext, useState} from 'react';
import UserContext from './UserContext';

const Signup = (props) => {
  const [usernameValue, setUsernameValue] = useState('');
  const [pw1Value, setPw1Value] = useState('');
  const [pw2Value, setPw2Value] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleUsername = (e: SyntheticEvent<HTMLInputElement>) => {
    setUsernameValue(e.currentTarget.value);
  };
  const handlePw1 = (e: SyntheticEvent<HTMLInputElement>) => {
    setPw1Value(e.currentTarget.value);
  };
  const handlePw2 = (e: SyntheticEvent<HTMLInputElement>) => {
    setPw2Value(e.currentTarget.value);
  };

  const {setUsername} = useContext(UserContext);

  const submit = () => {
    setErrorMsg('');

    const emailTrim = usernameValue.trim();
    const pw1Trim = pw1Value.trim();
    const pw2Trim = pw2Value.trim();

    if (pw1Trim != pw2Trim) {
      setErrorMsg('Both password must be the same.');
      return;
    }

    const data = {
      email: emailTrim,
      password: pw1Trim,
    };
    axios.post('/api/member', data).then((res) => {
      const data = res.data;
      if (data.username) {
        setUsername(data.username);
      } else if (data.error) {
        setErrorMsg(data.error);
      }
    }).catch((err) => {
      setErrorMsg(err.toString());
    });
  };

  return (
    <div className="wrapper">
      <h2>Signup</h2>
      <div className="dialog">
        <label>Username you want</label>
        <input onChange={handleUsername}></input>
        <label>Your password</label>
        <input type="password" onChange={handlePw1}></input>
        <label>Confirm password again</label>
        <input type="password" onChange={handlePw2}></input>
        <p className={`warning ${errorMsg ? '': 'hide'}`}>{errorMsg}</p>
        <button onClick={submit}>Submit</button>
      </div>
    </div>
  );
};

export default Signup;
