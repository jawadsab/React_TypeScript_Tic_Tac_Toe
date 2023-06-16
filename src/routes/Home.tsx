import React from 'react';
import Screen from '../components/Screen';

import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return (
    <Screen screenClassName="home-screen">
      <div className="section">
        <h1 className="heading">
          <span className="yellow-letter">T</span>
          <span className="red-letter"> I</span>
          <span className="yellow-letter">C</span>
        </h1>
        <h1 className="heading">
          <span className="red-letter">T</span>
          <span className="yellow-letter">A</span>
          <span className="red-letter">C</span>
        </h1>
        <h1 className="heading">
          <span className="yellow-letter">T</span>
          <span className="red-letter">O</span>
          <span className="yellow-letter">E</span>
        </h1>
      </div>
      <div className="section btns">
        <button
          onClick={() => navigate('/play', { a: 'State' })}
          className="single-player-btn btn"
        >
          Single Player
        </button>
      </div>
    </Screen>
  );
}

export default Home;
