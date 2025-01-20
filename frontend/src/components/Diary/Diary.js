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

  useEffect(() => {
    fetch(`http://localhost:8080/api/diary?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        setDiaries((prevDiaries) => [...prevDiaries, ...data]); // 기존 데이터와 합치기
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
      <div ref={loaderRef} className="loading-indicator">
        더 많은 다이어리를 불러오는 중...
      </div>
      <Link to="/diary/create">
        <button className="submit-button">작성</button>
      </Link>
    </div>
  );
}

export default Diary;
