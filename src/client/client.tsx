import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import APP from './components/App';

const App = (props) => {
  return (
    <BrowserRouter>
      <APP />
    </BrowserRouter>
  );
};

ReactDOM.hydrate(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('root'),
);
