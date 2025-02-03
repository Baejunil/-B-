import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function BoardList() {
  const [boards, setBoards] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 5; // 한 페이지당 게시글 개수

  useEffect(() => {
    fetch(`http://localhost:8080/api/board?page=${currentPage}&size=${postsPerPage}`)
      .then(response => response.json())
      .then(data => {
        setBoards(data.content); // Page 객체에서 리스트 값 가져오기
        setTotalPages(data.totalPages); // 전체 페이지 수 저장
      })
      .catch(error => console.error('Error fetching boards:', error));
  }, [currentPage]); // currentPage가 변경될 때마다 실행

  return (
    <div>
      <h2>게시판</h2>
      {boards.length > 0 ? (
        <ul>
          {boards.map((board) => (
            <li key={board.postId} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
              <h3>
                <Link to={`/board/${board.postId}`} style={{ textDecoration: 'none', color: '#333' }}>
                  {board.title}
                </Link>
              </h3>
              <p>
                <span style={{ marginRight: '15px' }}>조회수: {board.viewCount}</span>
                <span>작성자: {board.user ? board.user : '알 수 없음'}</span>
              </p>
              <p><strong>작성 날짜 :</strong> {new Date(board.createdDate).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>게시글이 존재하지 않습니다.</p>
      )}

      {/* 페이징 버튼 */}
      <div style={{ marginTop: '20px' }}>
        <button
          disabled={currentPage === 0}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          이전 페이지
        </button>
        <span style={{ margin: '0 10px' }}>
          {currentPage + 1} / {totalPages}
        </span>
        <button
          disabled={currentPage + 1 >= totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          다음 페이지
        </button>
      </div>
    </div>
  );
}

export default BoardList;
