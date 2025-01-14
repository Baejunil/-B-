import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Login from "./components/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="app">
        {isLoggedIn ? (
          <>
            <Header />
            <div className="main-content">
              <Sidebar />
              <div className="home-content">
                <h2>미니홈페이지 메인 화면</h2>
                <div className="sections">
                  <div className="section">
                    <h3>다이어리</h3>
                    <p>오늘의 일기를 작성하세요!</p>
                  </div>
                  <div className="section">
                    <h3>방명록</h3>
                    <p>방명록에 친구들이 남긴 글을 확인하세요!</p>
                  </div>
                  <div className="section">
                    <h3>게시판</h3>
                    <p>헬스 방법, 운동 방법, 노래 추천 게시판을 확인하세요!</p>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
