import React, { SyntheticEvent, useState } from 'react';
import './Home.css';

const Home = (props) => {
  const [inputValue, setInputValue] = useState('');

  const handleInput = (e: SyntheticEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  }

  const submit = () => {
    // TODO: waiting server side support
  };

  return (
    <div className="wrapper">
      <h2>A simple url shortener</h2>
      <div className="dialog">

        <input onChange={handleInput} placeholder="Write your URL here"></input>
        <button onClick={submit}>Compress!</button>
      </div>
    </div>
  );
}

export default Home;
