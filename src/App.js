// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShowList from './Components/ShowList';
import ShowDetail from './Components/ShowDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShowList />} />
        <Route path="/show/:showId" element={<ShowDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
