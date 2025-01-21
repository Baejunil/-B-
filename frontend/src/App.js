
import './App.css';

import React from "react";

import Diary from './component/diary/Diary';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DiaryForm from './component/diary/DiaryForm';
import DiaryDetail from './component/diary/DiaryDetail';
import DiaryEdit from './component/diary/DiaryEdit';

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/diary" element={<Diary />} />
        <Route path="/diary/create" element={<DiaryForm />} />
        <Route path="/diary/:id" element={<DiaryDetail />} />  
        <Route path="/diary/edit/:id" element={<DiaryEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
