import React, { useState, useEffect } from "react"
import Counter from "./counter.js"

const gameSettingsStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "1rem",
}

const gridItemStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}

const buttonStyle = {
  margin: "0.5rem 0.25rem",
  padding: "0.5rem 1rem",
  borderRadius: "5px",
  cursor: "pointer",
}

const selectedStyle = {
  margin: "0.2rem 0.25rem",
  padding: "0.5rem",
  borderRadius: "5px",
  backgroundColor: "darkGray",
}

const selectedRoleGrid = {
  textAlign: "center",
  display: "grid",
  gridTemplateColumns: "repeat(2, auto)",
  gap: "2px",
}

const GameSettings = ({ count, setCount }) => {
  const [selected, setSelected] = useState([])

  const updateSelected = (e) => {
    e.preventDefault()
    console.log(e.target.innerHTML)
    setSelected([...selected, event.target.innerHTML])
  }

  useEffect(() => {
    console.log(selected)
  }, [selected])

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>
          <b>Game Settings</b>
        </h1>
        <h2>
          Max Players <Counter count={count} setCount={setCount} />
        </h2>
      </div>
      <div style={gameSettingsStyle}>
        <div style={gridItemStyle}>
          <h2>Pool of Roles</h2>
          <button
            onClick={updateSelected}
            style={{
              ...buttonStyle,
              backgroundColor: "blue",
              color: "white",
            }}
          >
            Seer
          </button>
          <button
            onClick={updateSelected}
            style={{
              ...buttonStyle,
              backgroundColor: "green",
              color: "white",
            }}
          >
            Doctor
          </button>
          <button
            onClick={updateSelected}
            style={{
              ...buttonStyle,
              backgroundColor: "yellow",
              color: "black",
            }}
          >
            Villager
          </button>
          <button
            onClick={updateSelected}
            style={{
              ...buttonStyle,
              backgroundColor: "DarkGray",
              color: "white",
            }}
          >
            Wolf
          </button>
        </div>
        <div style={gridItemStyle}>
          <h2>Selected</h2>
          <div style={selectedRoleGrid}>
            <div style={selectedStyle}>Wolf</div>
            <div style={selectedStyle}>Villager</div>
            {selected.map((role, i) => (
              <div key={i} style={selectedStyle}>
                {role}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default GameSettings
