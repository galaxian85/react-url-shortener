import axios from 'axios';
import React, { SyntheticEvent, useState } from 'react';
import './Home.css';

const Home = (props) => {
  const [inputValue, setInputValue] = useState('');
  const [res, setRes] = useState('');

  const handleInput = (e: SyntheticEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  }

  const submit = () => {
    axios.post('/api/url', { url: inputValue })
    .then(res => {
      setRes(res.data);
    });
  };

  const shortUrl = <p>short URL:<a href={res}>{res}</a></p>;

  return (
    <div className="wrapper">
      <h2>A simple url shortener</h2>
      <div className="dialog">
        <input onChange={handleInput} placeholder="Write your URL here"></input>
        <button onClick={submit}>Compress!</button>
        {res ? shortUrl : ''}
      </div>
    </div>
  );
}

export default Home;
