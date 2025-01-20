import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Signup from './components/Signup';
import Login from './components/Login';
import FindId from './components/FindId';
import ResetPassword from './components/ResetPassword';

function App() {
  return (
    <Router>
      <div>
        <h1>사용자 계정 관리</h1>
        <nav>
          <ul>
            <li><Link to="/signup">회원가입</Link></li>
            <li><Link to="/login">로그인</Link></li>
            <li><Link to="/find-id">아이디 찾기</Link></li>
            <li><Link to="/reset-password">비밀번호 찾기</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/find-id" element={<FindId />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;