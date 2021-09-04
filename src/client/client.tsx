import React from 'react';
import ReactDOM from 'react-dom';
import APP from './components/App';

ReactDOM.hydrate(
    <APP />,
    document.getElementById('root'),
);
