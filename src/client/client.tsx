import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import APP from './components/App';

ReactDOM.hydrate(
    <BrowserRouter>
      <APP />
    </BrowserRouter>,
    document.getElementById('root'),
);
