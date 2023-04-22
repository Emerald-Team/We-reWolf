import { useState } from "react";

const Counter = ({count, setCount}) => {

  function adjustCount(amount) {
    setCount((currentCount) => {
      return currentCount + amount;
    });
  }

  return (
    <>
      {count >0 && <button onClick={() => adjustCount(-1)}>-</button>}
      <span>{count}</span>
      <button onClick={() => adjustCount(1)}>+</button>
    </>
  );
};

export default Counter;
