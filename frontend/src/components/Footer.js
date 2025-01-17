import React from "react";
import "./Footer.css";

function Footer() {
  // 현재 날짜를 가져와 'YYYY-MM-DD' 형식으로 표시
  const currentDate = new Date().toISOString().split("T")[0];
  return (
    <div className="footer">
      
      <div className="date">{currentDate}</div>
    </div>
  );
}

export default Footer;