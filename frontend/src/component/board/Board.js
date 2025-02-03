import React, { useState, useEffect } from 'react';
import BoardList from './BoardList';
import { Link } from 'react-router-dom';


function Board() {
    const [boards, setBoards] = useState([]);
  
    // 게시판 목록을 불러오는 함수
    useEffect(() => {
      fetch('http://localhost:8080/api/board')
        .then(response => response.json())
        .then(data => setBoards(data));
    }, []);
  
    
    
  
    return (
      <div>
        <h1>게시판</h1>
        <BoardList boards={boards} />
        <Link to="/board/create">
            <button>작성</button>
        </Link>
      </div>
    );
  }
  
  
  export default Board;