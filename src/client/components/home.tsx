import axios from 'axios';
import React, { SyntheticEvent, useState } from 'react';
import './Home.css';

const Home = (props) => {
  const [inputValue, setInputValue] = useState('');
  const [shortenUrl, setShortenUrl] = useState('');
  const [isUrlValid, setUrlValid] = useState(true);

  const handleInput = (e: SyntheticEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  }

  const submit = () => {
    axios.post('/api/url', { url: inputValue.trim() })
    .then(res => {
      setShortenUrl(res.data.shortenUrl);
      setUrlValid(res.data.isUrlValid);
    });
  };

  const shortUrl = <p>short URL: <a href={shortenUrl}>{shortenUrl}</a></p>;
  const invalidUrlWarning = <p className="warning">URL invalid!!</p>;

  return (
    <div className="wrapper">
      <h2>A simple url shortener</h2>
      <div className="dialog">
        <input onChange={handleInput} placeholder="Write your URL here"></input>
        <button onClick={submit}>Compress!</button>
        {isUrlValid ? '' : invalidUrlWarning}
        {shortenUrl ? shortUrl : ''}
      </div>
    </div>
  );
}

export default Home;
