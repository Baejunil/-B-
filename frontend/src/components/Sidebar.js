import React from "react";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="visitor-count">👀 방문자: 123명</div>
      <div className="latest-guestbook">
        <h3>방명록</h3>
        <p>안녕하세요! 놀러 왔어요 😊</p>
      </div>
    </div>
  );
}

export default Sidebar;
