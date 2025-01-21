import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import GuestbookHeader from "./GuestbookHeader";
import GuestbookEntry from "./GuestbookEntry";
import useInfiniteScroll from "../Diary/useInfiniteScroll";
import "./Guestbook.css";

function Guestbook() {
  const [guestbookEntries, setGuestbookEntries] = useState([]);
  const [newEntry, setNewEntry] = useState("");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const loaderRef = useRef(null);
  const isIntersecting = useInfiniteScroll(loaderRef);

  // 방명록 데이터 가져오기
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `http://localhost:8080/api/guestbook?page=${page}&size=10`
        );
        setGuestbookEntries((prev) => [...prev, ...response.data]);
      } catch (error) {
        console.error("Failed to fetch guestbook entries:", error);
        setError("Failed to load guestbook entries. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, [page]);

  // 무한 스크롤 페이지 증가
  useEffect(() => {
    if (isIntersecting) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [isIntersecting]);

  // 새 메시지 추가
  const handleAddEntry = async () => {
    if (!newEntry.trim()) return;

    try {
      setError(null);
      setLoading(true);
      await axios.post("http://localhost:8080/api/guestbook", { message: newEntry });
      setGuestbookEntries([]); // 기존 데이터 초기화
      setPage(0); // 첫 페이지부터 다시 불러오기
      setNewEntry(""); // 입력 필드 초기화
    } catch (error) {
      console.error("Failed to post guestbook entry:", error);
      setError(error.response?.data?.error || "Failed to add entry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="guestbook-container">
      <GuestbookHeader />
      <div className="guestbook-form">
        <input
          type="text"
          placeholder="Write a message..."
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
        />
        <button onClick={handleAddEntry} disabled={loading || !newEntry.trim()}>
          {loading ? "Posting..." : "Post"}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="guestbook-entries">
        {guestbookEntries.map((entry) => (
          <GuestbookEntry
            key={entry.guestbookId}
            message={entry.message}
            date={entry.createdDate}
            author={entry.userId || "Anonymous"}
          />
        ))}
      </div>

      {loading && <p className="loading-indicator">Loading...</p>}

      <div ref={loaderRef} className="scroll-loader"></div>
    </div>
  );
}

export default Guestbook;
