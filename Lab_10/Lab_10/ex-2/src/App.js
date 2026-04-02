import React, { useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  const addItem = () => {
    if (input === "") return;

    const newItem = {
      id: Date.now(),
      text: input,
    };

    setItems([...items, newItem]);
    setInput("");
  };

  const removeItem = (id) => {
    const updatedList = items.filter((item) => item.id !== id);
    setItems(updatedList);
  };

  return (
    <div>
      <h1>Dynamic List</h1>

      <input
        type="text"
        placeholder="Enter item"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={addItem}>Add</button>

      {items.length === 0 ? (
        <p>No items available</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.text}
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;