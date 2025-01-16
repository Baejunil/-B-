
import './App.css';

import React from "react";

import Diary from './component/Diary';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DiaryForm from './component/DiaryForm';
import DiaryDetail from './component/DiaryDetail';

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/diary" element={<Diary />} />
        <Route path="/diary/create" element={<DiaryForm />} />
        <Route path="/diary/:id" element={<DiaryDetail />} />  
      </Routes>
    </Router>
  );
}

export default App;
