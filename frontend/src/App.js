import React, { useState, useEffect } from "react";import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom"; // Link 추가
import Home from "./pages/Home";
import Guestbook from "./components/Guestbook/Guestbook";
import Diary from "./components/Diary/Diary";
import Board from "./components/Board";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Layout from "./components/Layout";
import DiaryDetail from "./components/Diary/DiaryDetail";
import DiaryForm from "./components/Diary/DiaryForm";
import DiaryEdit from "./components/Diary/DiaryEdit";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("isLoggedIn") === "true"
  );

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <Router>
  <div>
        <h1>사용자 계정 관리</h1>
        <nav>
          <ul>
            <li><Link to="/signup">회원가입</Link></li>
            <li><Link to="/login">로그인</Link></li>
            <li><Link to="/find-id">아이디 찾기</Link></li>
            <li><Link to="/reset-password">비밀번호 찾기</Link></li>
          </ul>
        </nav>
        console.log("회원가입 성공, 로그인 페이지로 이동");
        navigate("/login");
</div>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
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
