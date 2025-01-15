import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="profile-section">
        <img src="/profile.png" alt="프로필 사진" className="profile-pic" />
        <div className="profile-info">
          <p>😀 이름</p>
          <p>📞 Phone</p>
          <p>📧 E-mail</p>
          <p>⭐ 인스타그램</p>
        </div>
        <div className="mood-selector">
          <label htmlFor="mood">오늘의 기분</label>
          <select id="mood">
            <option>기쁨 😍</option>
            <option>슬픔 😢</option>
            <option>화남 😡</option>
            <option>설렘 💖</option>
          </select>
        </div>
      </div>

      <div className="news-section">
        <h2>Updated News</h2>
        <ul>
          <li><span className="tag">다이어리</span> GraphQL</li>
          <li><span className="tag">다이어리</span> NextJS</li>
          <li><span className="tag">다이어리</span> 넘블 챌린지</li>
          <li><span className="tag">다이어리</span> 싸이월드 추억</li>
        </ul>
        <h2>추억의 BGM</h2>
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>곡명</th>
              <th>아티스트</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Nxde</td>
              <td>(여자)아이들</td>
            </tr>
            <tr>
              <td>2</td>
              <td>새삥</td>
              <td>지코 (ZICO)</td>
            </tr>
            <tr>
              <td>3</td>
              <td>After LIKE</td>
              <td>IVE (아이브)</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Hype Boy</td>
              <td>NewJeans</td>
            </tr>
            <tr>
              <td>5</td>
              <td>Rush Hour</td>
              <td>Crush</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
