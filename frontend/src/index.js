import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // 추가 스타일 (선택)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
