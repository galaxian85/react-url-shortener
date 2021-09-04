import React from 'react';
import {UrlRow} from './Home';

interface Props {
  urlRows: Array<UrlRow>
}

const UrlList = (props: Props) => {
  const items = props.urlRows.map((row) =>
    <li key={row.originUrl}>
      <p>origin url: {row.originUrl}</p>
      <p>short url: <a href={row.shortenUrl}>{row.shortenUrl}</a></p>
    </li>,
  );
  return <ul className="url-list">{items}</ul>;
};

export default UrlList;
