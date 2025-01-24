import React from "react";

function Profile({ user, miniHomeData }) {
  console.log(user)

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
          <p>😀 유저명: {user.data.username|| "정보 없음"}</p>
          <p>🎉 가입일: {user.data.joinDate ? user.data.joinDate.substring(0, 10) : "정보 없음"}</p>
          <p>✉ 이메일: {user.data.email || "정보 없음"}</p>
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
        {/* 추가적으로 미니홈 데이터를 렌더링 */}
      <div>
        <h1>{miniHomeData.background || "미니홈 제목 없음"}</h1>
        <p>{miniHomeData.description || "설명이 없습니다."}</p>
        {/* 필요한 추가 데이터 렌더링 */}
      </div>
        
      </div>
    </div>
  );
}

export default Profile;