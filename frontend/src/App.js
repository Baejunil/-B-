import React from "react";
import "./App.css";
import Header from "./components/Header";
import MiniRoom from "./components/MiniRoom";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="main-content">
        <MiniRoom/>
        <Sidebar/>
              </div>
      <Footer/>
          </div>
  );
}

export default App;
