import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        {/* 다른 라우팅 설정 */}
      </Routes>
    </Router>
  );
}

export default App;
