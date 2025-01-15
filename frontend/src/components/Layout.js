import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./Layout.css";

function Layout({ children, setIsLoggedIn }) {
  return (
    <div className="layout">
      {/* Header에 setIsLoggedIn 전달 */}
      <Header setIsLoggedIn={setIsLoggedIn} />
      <div className="main-content">
        <div className="content">{children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
