import React from "react";
import Header from "./Header";
import "./Layout.css";
import Footer from "./Footer";
import MiniHomePage from "./MiniRoom/MiniHomePage";

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

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Layout;
