
import './App.css';

import React from "react";

import Diary from './component/diary/Diary';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DiaryForm from './component/diary/DiaryForm';
import DiaryDetail from './component/diary/DiaryDetail';
import DiaryEdit from './component/diary/DiaryEdit';

import Board from './component/board/Board';
import BoardForm from './component/board/BoardForm';
import BoardDetail from './component/board/BoardDetail';

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/diary" element={<Diary />} />
        <Route path="/diary/create" element={<DiaryForm />} />
        <Route path="/diary/:id" element={<DiaryDetail />} />  
        <Route path="/diary/edit/:id" element={<DiaryEdit />} />
      </Routes>
      <Routes>
        <Route path="/board" element={<Board />} />
        <Route path="/board/create" element={<BoardForm />} />
        <Route path="/board/:id" element={<BoardDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
