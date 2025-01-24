import React from "react";
import axios from "axios";

function GuestbookEntry({ guestbookId, message, date, author, currentUser, onDelete }) {

  // 삭제 버튼 클릭 핸들러
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/api/guestbook/${guestbookId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // 삭제 성공 후, 상위 컴포넌트에 알림
      onDelete(guestbookId);
    } catch (err) {
      console.error("Failed to delete entry:", err);
      alert(err.response?.data?.error || "Failed to delete entry");
    }
  };

  // 작성자와 현재 로그인 유저가 같으면 삭제 버튼 표시
  const canDelete = (author === currentUser);

  return (
    <div className="guestbook-entry">
      <p>{message}</p>
      <p className="guestbook-date">
        {new Date(date).toLocaleString()} - 작성자: {author}
      </p>

      {canDelete && (
        <button
          onClick={handleDelete}
          className="delete-button"
        >
          X
        </button>
        
      )}
      
    </div>
    
  );
}

export default GuestbookEntry;
