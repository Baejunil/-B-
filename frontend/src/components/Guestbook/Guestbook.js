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
  const [hasMore, setHasMore] = useState(true);

  /**
   * 현재 로그인 유저 ID
   * (초기값은 빈 문자열, 이후 setCurrentUser로 실제 ID를 저장)
   */
  const [currentUser, setCurrentUser] = useState("");

  const loaderRef = useRef(null);
  const isIntersecting = useInfiniteScroll(loaderRef);

  /**
   * [1] 현재 로그인 유저 정보 가져오기 (예: /api/users/me)
   *     - 또는 JWT 토큰 decoding
   */
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        // 예) /api/users/me를 호출해 userId 획득
        const response = await axios.get("http://localhost:8080/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (response.data && response.data.data) {
          // 백엔드 구조에 맞춰 userId를 추출
          setCurrentUser(response.data.data.userId);
        }
      } catch (err) {
        console.error("Failed to fetch current user:", err);
      }
    };

    fetchCurrentUser();
  }, []);

  /**
   * [2] 내 방명록 가져오기 (무한 스크롤)
   */
  useEffect(() => {
    const fetchMyEntries = async () => {
      if (!hasMore) return;
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8080/api/guestbook/mine?page=${page}&size=10`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 204) {
          setHasMore(false);
          return;
        }

        if (response.data && response.data.length > 0) {
          setGuestbookEntries((prev) => [...prev, ...response.data]);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Failed to fetch guestbook entries:", error);
        setError("Failed to load your guestbook entries. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyEntries();
  }, [page, hasMore]);

  /**
   * [Infinite Scroll] 교차점 감지 -> 페이지 증가
   */
  useEffect(() => {
    if (isIntersecting && !loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [isIntersecting, loading, hasMore]);

  /**
   * 새 메시지 작성
   */
  const handleAddEntry = async () => {
    if (!newEntry.trim()) return;

    try {
      setError(null);
      setLoading(true);

      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8080/api/guestbook",
        { message: newEntry },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 새 항목 추가 후, 첫 페이지부터 다시 로드
      setGuestbookEntries([]);
      setPage(0);
      setHasMore(true);
      setNewEntry("");
    } catch (error) {
      console.error("Failed to post guestbook entry:", error);
      setError(error.response?.data?.error || "Failed to add entry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * 삭제 성공 시 목록에서 제거
   */
  const handleDeleteInParent = (deletedId) => {
    setGuestbookEntries((prev) =>
      prev.filter((item) => item.guestbookId !== deletedId)
    );
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
            guestbookId={entry.guestbookId}
            message={entry.message}
            date={entry.createdDate}
            author={entry.userId || "Anonymous"}
            currentUser={currentUser}        // 현재 로그인 유저
            onDelete={handleDeleteInParent}  // 삭제 후 목록 갱신
          />
        ))}
      </div>

      {loading && <p className="loading-indicator">Loading...</p>}

      <div ref={loaderRef} className="scroll-loader"></div>
    </div>
  );
}

export default Guestbook;
