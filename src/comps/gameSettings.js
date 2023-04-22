import { useState, useEffect } from "react";
import Counter from "./Counter.js";
const GameSettings = ({ count, setCount }) => {
  const [selected, setSelected] = useState([]);

  const updateSelected = (e) => {
    e.preventDefault();
    console.log(e.target.innerHTML)
    setSelected([...selected, event.target.innerHTML]);
  }

  useEffect(() => {
    console.log(selected)
  }, [selected])

  return (
    <>
      <div>
        <h1> <b>Game Settings</b></h1>
        <h2>
          Max Players <Counter count={count} setCount={setCount} />
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2>Pool of Roles</h2>
            <button onClick={updateSelected}>Seer</button>
            <button onClick={updateSelected}>Doctor</button>
            <button onClick={updateSelected}>Villager</button>
            <button onClick={updateSelected}>Wolf</button>
          </div>
          <div>
            <h2>Selected</h2>
            <div>Wolf</div>
            <div>Villager</div>
            {selected.map((role, i) => (
              <div key = {i}>{role}</div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default GameSettings;
