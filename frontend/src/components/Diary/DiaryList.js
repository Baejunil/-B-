import React from "react";
import { Link } from "react-router-dom";
import "./DiaryPage.css";

function DiaryList({ diaries }) {
  const sortedDiaries = [...diaries].sort(
    (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
  );

  return (
    <div className="diary-list-container">
      {sortedDiaries.length > 0 ? (
        <ul className="diary-list">
          {sortedDiaries.map((diary, index) => (
            <li key={diary.id || diary.diaryId || index} className="diary-item">
              <Link to={`/diary/${diary.id || diary.diaryId}`} className="diary-link">
                <h3 className="diary-item-title">{diary.title}</h3>
              </Link>
              <p className="diary-item-date">
                작성 날짜: {new Date(diary.createdDate).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-list-message">다이어리가 없습니다.</p>
      )}
    </div>
  );
}

export default DiaryList;
