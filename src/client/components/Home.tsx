import axios from 'axios';
import React, {SyntheticEvent, useContext, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {logoutCurrentUser} from '../util/util';
import './Home.css';
import UrlList from './UrlList';
import UserContext from './UserContext';

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
    axios.post('/api/url', {url: originUrl}).then((res) => {
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


  const {username} = useContext(UserContext);
  if (username) {
    useHistory().push('/mypage');
    axios.get('/api/url/list').then((res) => {
      const data = res.data;
      const rows: Array<UrlRow> = data.list.map((item) => {
        return {
          originUrl: item.originUrl,
          shortenUrl: item.shortenUrl,
        };
      });
      setUrlRows(rows);
    }).catch((err) => {
      logoutCurrentUser();
    });
  }

  return (
    <div className="wrapper">
      <h2>A simple url shortener</h2>
      <div className="dialog">
        <input onChange={handleInput} placeholder="Write your URL here"></input>
        <button onClick={submit}>Compress!</button>
        <p className={`warning ${isUrlValid ? 'hide' : ''}`}>URL invalid!!</p>
      </div>
      <h3 className={username ? '' : 'hide'}>Your personal history</h3>
      <UrlList urlRows={urlRows} />
    </div>
  );
};

export default Home;
