import React from 'react';

const UrlList = (props) => {
  const items = props.urlRows.map(row =>
    <li key={row.originUrl}>
      <p>origin url: <a href={row.originUrl}>{row.originUrl}</a></p>
      <p>short url: <a href={row.shortenUrl}>{row.shortenUrl}</a></p>
    </li>
  );
  return <ul className="url-list">{items}</ul>;
}

export default UrlList;
