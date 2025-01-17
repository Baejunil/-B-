import React from "react";

function Profile({ user }) {
  if (!user) {
    return <div>사용자 정보를 불러오는 중입니다...</div>;
  }

  return (
    <div className="diary-sidebar">
      <div className="profile-section">
        {/* 프로필 사진 */}
        <img src="/cat.jpg" alt="프로필 사진" className="profile-pic" />

        {/* 프로필 정보 */}
        <div className="profile-info">
          <p>😀 유저명: {user.username || "정보 없음"}</p>
          <p>🎉 가입일: {user.joinDate ? user.joinDate.substring(0, 10) : "정보 없음"}</p>
          <p>✉ 이메일: {user.email || "정보 없음"}</p>
        </div>

        {/* 기분 선택 */}
        <div className="mood-selector">
          <label htmlFor="mood">오늘의 기분</label>
          <select id="mood">
            <option>기쁨 😍</option>
            <option>슬픔 😢</option>
            <option>화남 😡</option>
            <option>설렘 💖</option>
          </select>
        </div>

        {/* 음악 */}
        <div className="music">
          <audio controls autoPlay loop>
            <source src="/music.mp3" type="audio/mpeg" />
            브라우저가 오디오를 지원하지 않습니다.
          </audio>
        </div>
      </div>
    </div>
  );
}

export default Profile;
