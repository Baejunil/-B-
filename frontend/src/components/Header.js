import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false); // 로그인 상태 초기화
    localStorage.removeItem("isLoggedIn"); // LocalStorage에서 로그인 상태 제거
    navigate("/login"); // 로그인 페이지로 이동
  };

  return (
    <div className="header">
      <div className="profile">
        <img src="/profile.png" alt="프로필 사진" className="profile-pic" />
        <div className="status-message">🌟 행복한 하루! 🌟</div>
      </div>
      <div className="nav">
        <button className="nav-btn" onClick={() => navigate("/home")}>홈</button>
        <button className="nav-btn" onClick={() => navigate("/guestbook")}>방명록</button>
        <button className="nav-btn" onClick={() => navigate("/diary")}>다이어리</button>
        <button className="nav-btn" onClick={() => navigate("/board")}>게시판</button>
        <button className="nav-btn logout-btn" onClick={handleLogout}>로그아웃</button>
      </div>
    </div>
  );
}

export default Header;
