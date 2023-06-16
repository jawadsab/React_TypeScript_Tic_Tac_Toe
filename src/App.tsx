import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Game from './routes/Game';
import Home from './routes/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/play" element={<Game />} />
    </Routes>
  );
}

export default App;
