import React from "react";

function GuestbookEntry({ message, date, author }) {
  return (
    <div className="guestbook-entry">
      <p>{message}</p>
      <p className="guestbook-date">
        {new Date(date).toLocaleString()} - Author: {author}
      </p>
    </div>
  );
}

export default GuestbookEntry;
