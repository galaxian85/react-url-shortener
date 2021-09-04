import axios from 'axios';
import React, {SyntheticEvent, useState} from 'react';
import './Home.css';
import UrlList from './UrlList';

export interface UrlRow {
  originUrl: string,
  shortenUrl: string,
}

const Home = (props) => {
  const [inputValue, setInputValue] = useState('');
  const [isUrlValid, setUrlValid] = useState(true);
  const [urlRows, setUrlRows] = useState<Array<UrlRow>>([]);

  const handleInput = (e: SyntheticEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const submit = () => {
    const originUrl = inputValue.trim();
    axios.post('/api/url', {url: originUrl})
        .then((res) => {
          const isValid = res.data.isUrlValid;
          setUrlValid(isValid);
          if (!isValid) return;

          const item: UrlRow = {
            originUrl: originUrl,
            shortenUrl: res.data.shortenUrl,
          };
          const copy = urlRows
              .filter((row) => row.shortenUrl != item.shortenUrl);
          setUrlRows([item, ...copy]);
        });
  };

  return (
    <div className="wrapper">
      <h2>A simple url shortener</h2>
      <div className="dialog">
        <input onChange={handleInput} placeholder="Write your URL here"></input>
        <button onClick={submit}>Compress!</button>
        <p className={`warning ${isUrlValid ? 'hide' : ''}`}>URL invalid!!</p>
      </div>
      <UrlList urlRows={urlRows} />
    </div>
  );
};

export default Home;
