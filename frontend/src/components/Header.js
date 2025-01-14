import React from "react";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <div className="profile">
        <img src="/profile.png" alt="프로필 사진" className="profile-pic" />
        <div className="status-message">🌟 행복한 하루! 🌟</div>
      </div>
      <div className="nav">
        <button className="nav-btn">홈</button>
        <button className="nav-btn">방명록</button>
        <button className="nav-btn">사진첩</button>
        <button className="nav-btn">게시판</button>
      </div>
    </div>
  );
}

export default Header;
