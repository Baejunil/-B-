import React, { useState } from "react";
import "./Board.css";

function Board() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAddPost = () => {
    if (title.trim() && content.trim()) {
      setPosts([...posts, { title, content }]);
      setTitle("");
      setContent("");
    }
  };

  return (
    <div className="board-container">
      <h2>게시판</h2>
      <div className="board-form">
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="내용을 입력하세요..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={handleAddPost}>작성</button>
      </div>
      <div className="board-posts">
        {posts.map((post, index) => (
          <div key={index} className="board-post">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Board;
