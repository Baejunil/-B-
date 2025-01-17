import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Guestbook from "./components/Guestbook";
import Diary from "./components/Diary";
import Board from "./components/Board";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Layout from "./components/Layout";
import DiaryDetail from "./components/DiaryDetail";
import DiaryForm from "./components/DiaryForm";
import DiaryEdit from "./components/DiaryEdit";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("isLoggedIn") === "true"
  );

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  return (
    
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />
          }
        />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/home"
          element={<Layout setIsLoggedIn={setIsLoggedIn}><Home /></Layout>}
        />
        <Route
          path="/guestbook"
          element={<Layout setIsLoggedIn={setIsLoggedIn}><Guestbook /></Layout>}
        />
        <Route
          path="/diary"
          element={<Layout setIsLoggedIn={setIsLoggedIn}><Diary /></Layout>}
        />
           <Route path="/diary/create"  element={<Layout setIsLoggedIn={setIsLoggedIn}><DiaryForm /></Layout>} />
        <Route path="/diary/:id"  element={<Layout setIsLoggedIn={setIsLoggedIn}><DiaryDetail /></Layout>} />  
        <Route path="/diary/edit/:id"  element={<Layout setIsLoggedIn={setIsLoggedIn}><DiaryEdit /></Layout>} />

        <Route
          path="/board"
          element={<Layout setIsLoggedIn={setIsLoggedIn}><Board /></Layout>}
        />

      </Routes>
    </Router>
  );
}

export default App;
