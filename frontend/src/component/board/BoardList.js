import React from 'react';
import { Link } from 'react-router-dom';

function BoardList({boards}){
    return (
        <div>
          
          {boards.length > 0 ? (
            <ul>
              {boards.map((board) => (
                <li key={board.postId}>
                  <h3>
                  <Link to={`/board/${board.postId}`}>{board.title}</Link>
                  <label> 댓글수: </label>
                  </h3>
                  <p><strong>작성 날짜 : </strong> {new Date(board.createdDate).toLocaleString()}</p>
                </li>
                
              ))}
              
            </ul>
          ) : (
            <p>게시글이 존재하지 않습니다.</p>
          )}
        </div>
      );
    
}

export default BoardList;