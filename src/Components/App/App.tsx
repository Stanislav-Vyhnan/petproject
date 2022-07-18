import React from 'react';
import { Routes, BrowserRouter, Route, Navigate, Link } from 'react-router-dom';

import './App.scss';

import FirstScreen from '../FirstScreen/FirstScreen';
import SecondScreen from '../SecondScreen/SecondScreen';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Link to="/">
          <h1>GitHub Searcher</h1>
        </Link>
        <Routes>
          <Route path="" element={<FirstScreen />} />
          <Route path="user/:login" element={<SecondScreen />} />
          <Route path="*" element={<Navigate to="" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
