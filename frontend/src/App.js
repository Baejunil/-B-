
import './App.css';

import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/api/hello")
      .then((response) => setMessage(response.data))
      .catch((error) => console.error("Error fetching message:", error));
  }, []);

  return (
    <div>
      <h1>Fitness & Music Minihome</h1>
      <p>Backend Message: {message}</p>
    </div>
  );
}

export default App;
