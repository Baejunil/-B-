
import './App.css';

// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Diary from './component/diary/Diary';
// import DiaryForm from './component/diary/DiaryForm';
// import DiaryDetail from './component/diary/DiaryDetail';
// import DiaryEdit from './component/diary/DiaryEdit';
//import Board from './component/board/Board';
//import BoardForm from './component/board/BoardForm';
//import BoardDetail from './component/board/BoardDetail';

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
//import Guestbook from "./components/Guestbook/Guestbook";
import Diary from "./component/diary/Diary";
//import Board from "./components/Board";
import Login from "./component/Login"; // 파일명과 일치하도록 수정
import Signup from "./component/Signup"; // 파일명과 일치하도록 수정
import Layout from "./component/Layout";
import DiaryDetail from "./component/diary/DiaryDetail";
import DiaryForm from "./component/diary/DiaryForm";
import DiaryEdit from "./component/diary/DiaryEdit";
import FindPassword from "./component/ResetPassword"; // 비밀번호 찾기 컴포넌트 추가
import FindId from "./component/FindId"; // 아이디 찾기 컴포넌트 추가

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("isLoggedIn") === "true"
  );

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <Router>
      <Routes>
        {/* 메인 페이지 라우트 */}
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />}
        />
        {/* 로그인 및 회원가입 */}
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup />} />

        {/* 아이디 찾기 및 비밀번호 찾기 */}
        <Route path="/find-id" element={<FindId />} />
        <Route path="/find-password" element={<FindPassword />} />

        {/* 메인 레이아웃과 연결된 페이지 */}
        <Route
          path="/home"
          element={<Layout setIsLoggedIn={setIsLoggedIn}><Home /></Layout>}
        />
        <Route
          path="/diary"
          element={<Layout setIsLoggedIn={setIsLoggedIn}><Diary /></Layout>}
        />
        <Route
          path="/diary/create"
          element={<Layout setIsLoggedIn={setIsLoggedIn}><DiaryForm /></Layout>}
        />
        <Route
          path="/diary/:id"
          element={<Layout setIsLoggedIn={setIsLoggedIn}><DiaryDetail /></Layout>}
        />
        <Route
          path="/diary/edit/:id"
          element={<Layout setIsLoggedIn={setIsLoggedIn}><DiaryEdit /></Layout>}
        />
      </Routes>
    </Router>

    // <Router>
    //   <Routes>
    //     <Route path="/diary" element={<Diary />} />
    //     <Route path="/diary/create" element={<DiaryForm />} />
    //     <Route path="/diary/:id" element={<DiaryDetail />} />  
    //     <Route path="/diary/edit/:id" element={<DiaryEdit />} />

    //     <Route path="/board" element={<Board />} />
    //     <Route path="/board/create" element={<BoardForm />} />
    //     <Route path="/board/:id" element={<BoardDetail />} />
    //   </Routes>
      
    // </Router>
  );
}

export default App;