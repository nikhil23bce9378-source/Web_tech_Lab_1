import React, { useState } from "react";

function Counter() {

  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div style={{textAlign:"center", marginTop:"30px"}}>

      <h2>Counter Value: {count}</h2>

      <button onClick={increment}>Increment</button>

      <button onClick={decrement} style={{marginLeft:"10px"}}>
        Decrement
      </button>

    </div>
  );
}

export default Counter;