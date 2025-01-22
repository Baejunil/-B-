import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Guestbook from "./components/Guestbook/Guestbook";
import Diary from "./components/Diary/Diary";
import Board from "./components/Board";
import Login from "./components/Login"; // 파일명과 일치하도록 수정
import Signup from "./components/Signup"; // 파일명과 일치하도록 수정
import Layout from "./components/Layout";
import DiaryDetail from "./components/Diary/DiaryDetail";
import DiaryForm from "./components/Diary/DiaryForm";
import DiaryEdit from "./components/Diary/DiaryEdit";
import FindPassword from "./components/ResetPassword"; // 비밀번호 찾기 컴포넌트 추가
import FindId from "./components/Findld"; // 아이디 찾기 컴포넌트 추가

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
          path="/guestbook"
          element={<Layout setIsLoggedIn={setIsLoggedIn}><Guestbook /></Layout>}
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
        <Route
          path="/board"
          element={<Layout setIsLoggedIn={setIsLoggedIn}><Board /></Layout>}
        />
      </Routes>
    </Router>
  );
}

export default App;
