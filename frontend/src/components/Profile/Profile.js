import React, { useState } from "react";

function Profile({ user, miniHomeData, updateBackground }) {
  const [previewUrl, setPreviewUrl] = useState(
    miniHomeData.background || "/default-profile.png"
  );

  if (!user) {
    return <div>사용자 정보를 불러오는 중입니다...</div>;
  }

  // 파일 선택 핸들러
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);

      // 사용자 확인
      const userConfirmed = window.confirm("프로필 변경하시겠습니까?");
      if (userConfirmed) {
        handleFileUpload(file);
      } else {
        // 변경 취소 시 원래 이미지로 복귀
        setPreviewUrl(miniHomeData.background || "/default-profile.png");
      }
    }
  };

  // 파일 업로드 + background 업데이트 핸들러
  const handleFileUpload = async (file) => {
    try {
      // 업로드 직전 파일 확인
      console.log("[Profile] Uploading file:", file);

      const formData = new FormData();
      formData.append("file", file);

      const token = localStorage.getItem("token");
      console.log("[Profile] Token used for PUT request:", token);

      console.log("[Profile] PUT /api/minihome/... body (FormData):", formData);

      const response = await fetch(
        `http://localhost:8080/api/minihome/${miniHomeData.user.data.userId}/background`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            // 'Content-Type': 'multipart/form-data' <- 자동 설정되어야 함
          },
          body: formData,
        }
      );

      console.log("[Profile] PUT response status:", response.status);
      console.log("[Profile] PUT response OK?", response.ok);

      if (!response.ok) {
        throw new Error("프로필 사진 업데이트 실패");
      }

      const data = await response.json();
      console.log("[Profile] PUT response body:", data);

      const { fileUrl } = data;

      alert("프로필 사진이 성공적으로 업데이트되었습니다!");
      updateBackground(fileUrl);
    } catch (error) {
      console.error("[Profile] 파일 업로드 오류:", error.message);
      alert(error.message);
      setPreviewUrl(miniHomeData.background || "/default-profile.png");
    }
  };

  return (
    <div className="diary-sidebar">
      <div>
        <p>{miniHomeData.description || "설명이 없습니다."}</p>
      </div>
      <div className="profile-section">
        {/* 프로필 사진 */}
        <div className="profile-picture-section">
          <img
            src={previewUrl}
            alt="프로필 사진"
            className="profile-pic"
            style={{ cursor: "pointer" }}
            onClick={() => document.getElementById("fileUpload").click()}
          />
          <input
            id="fileUpload"
            type="file"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleFileSelect}
          />
        </div>

        {/* 프로필 정보 */}
        <div className="profile-info">
          <p>😀 유저명: {user.data.username || "정보 없음"}</p>
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
