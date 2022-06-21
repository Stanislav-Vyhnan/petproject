import React from 'react';
import { Routes, BrowserRouter, Route } from 'react-router-dom';

import './App.scss';

import FirstScreen from '../FirstScreen/FirstScreen';
import SecondScreen from '../SecondScreen/SecondScreen';

const App = () => {
  return (
    <div className="app">
      <h1>GitHub Searcher</h1>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<FirstScreen />} />
          <Route path="user/:id" element={<SecondScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
