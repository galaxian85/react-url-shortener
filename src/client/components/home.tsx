import React, { useState } from 'react';
import './Home.css';

const Home = (props) => {
  const [isPink, toggleColor] = useState(false);

  return (
    <div>
      <h2>Homepage</h2>
      <button onClick={() => toggleColor(!isPink)}>click me</button>
      <div className={`square ${isPink ? 'pink' : 'aqua'}`}></div>
    </div>
  );
}

export default Home;
