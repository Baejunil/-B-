import React from "react";
import Header from "./Header";
import "./Layout.css";
import MiniHomePage from "./miniroom/MiniHomePage";

function Layout({ children, setIsLoggedIn }) {
  return (
    <div className="layout">
      {/* Header */}
      <Header setIsLoggedIn={setIsLoggedIn} />
 
      {/* Main Content */}
      <div className="main-content">
        <MiniHomePage />
        <div className="content">{children}</div>
      </div>

      
    </div>
  );
}

export default Layout;