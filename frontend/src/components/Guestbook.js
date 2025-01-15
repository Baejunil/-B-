import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Guestbook.css";

function Guestbook() {
  const [guestbookEntries, setGuestbookEntries] = useState([]);
  const [newEntry, setNewEntry] = useState("");

  // 방명록 데이터 가져오기 (GET 요청)
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/guestbook")
      .then((response) => {
        setGuestbookEntries(response.data); // 서버에서 받은 데이터 설정
      })
      .catch((error) => {
        console.error("방명록 데이터를 가져오는 중 오류 발생:", error);
      });
  }, []);

  // 방명록 새 글 작성 (POST 요청)
  const handleAddEntry = () => {
    if (newEntry.trim()) {
      axios
        .post("http://localhost:8080/api/guestbook", { content: newEntry })
        .then(() => {
          setNewEntry(""); // 입력 필드 초기화
          // 성공적으로 작성 후 데이터 새로고침
          return axios.get("http://localhost:8080/api/guestbook");
        })
        .then((response) => {
          setGuestbookEntries(response.data);
        })
        .catch((error) => {
          console.error("방명록 작성 중 오류 발생:", error);
        });
    }
  };

  return (
    <div className="guestbook-container">
      <h2>방명록</h2>
      <div className="guestbook-form">
        <input
          type="text"
          placeholder="방명록에 남길 말을 입력하세요..."
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
        />
        <button onClick={handleAddEntry}>작성</button>
      </div>
      <div className="guestbook-entries">
        {guestbookEntries.map((entry, index) => (
          <div key={index} className="guestbook-entry">
            {entry.content}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Guestbook;
