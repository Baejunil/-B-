import React from "react";
import "./Footer.css";

function Footer() {
  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <div className="footer">
      <audio controls autoPlay loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>
      <div className="date">{currentDate}</div>
    </div>
  );
}

export default Footer;
