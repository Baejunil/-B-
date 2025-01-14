import React, { useState } from "react";
import "./MiniRoom.css";

function MiniRoom() {
  const [items, setItems] = useState([
    { id: 1, emoji: "🌵", x: 20, y: 50 },
    { id: 2, emoji: "📦", x: 100, y: 80 },
  ]);

  const handleDrag = (id, newX, newY) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, x: newX, y: newY } : item
      )
    );
  };

  return (
    <div className="miniroom">
      <img src="/room-background.png" alt="미니룸 배경" className="room-bg" />
      <div className="items">
        {items.map((item) => (
          <div
            key={item.id}
            className="item"
            style={{ left: `${item.x}px`, top: `${item.y}px` }}
            draggable
            onDragEnd={(e) =>
              handleDrag(
                item.id,
                e.clientX - e.currentTarget.offsetParent.offsetLeft,
                e.clientY - e.currentTarget.offsetParent.offsetTop
              )
            }
          >
            {item.emoji}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MiniRoom;
