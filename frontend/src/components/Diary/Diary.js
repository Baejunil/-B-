import React, { useState, useRef, useEffect } from "react";
import DiaryList from "./DiaryList";
import { Link } from "react-router-dom";
import useInfiniteScroll from "./useInfiniteScroll";
import "./DiaryPage.css";

function Diary() {
  const [diaries, setDiaries] = useState([]);
  const [page, setPage] = useState(1); // 페이지 상태
  const loaderRef = useRef(null); // Intersection Observer를 위한 ref
  const isIntersecting = useInfiniteScroll(loaderRef);

  // 중복 데이터를 방지하도록 데이터 가져오기
  useEffect(() => {
    fetch(`http://localhost:8080/api/diary?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        setDiaries((prevDiaries) => {
          // 중복 데이터를 필터링
          const newDiaries = data.filter(
            (newDiary) => !prevDiaries.some((diary) => diary.id === newDiary.id)
          );
          return [...prevDiaries, ...newDiaries]; // 중복 제거된 데이터 추가
        });
      })
      .catch((error) => console.error("Error fetching diaries:", error));
  }, [page]);

  useEffect(() => {
    if (isIntersecting) {
      setPage((prevPage) => prevPage + 1); // 페이지 증가
    }
  }, [isIntersecting]);

  return (
    <div className="diary-container">
      <h1>다이어리</h1>
      <DiaryList diaries={diaries} />
     
      <Link to="/diary/create">
        <button className="submit-button">작성</button>
      </Link>
    </div>
  );
}

export default Diary;
