import React from "react"

const playerListStyles = {
  display: "flex",
  flexDirection: "column",
}

const playerItemStyles = {
  border: "0.5px solid black",
  backgroundColor: "white",
  padding: "5px",
  margin: "5px 0",
  borderRadius: "5px", // Added borderRadius property for rounded corners
}

const playerListGrid = {
  textAlign: "center",
  display: "grid",
  gridTemplateColumns: "repeat(2, auto)",
  gap: "10px",
}

const PlayerList = ({ count, players }) => {
  return (
    <>
      <div style={playerListStyles}>
        <h1>
          <b>Player List</b> <span>1/{count}</span>
        </h1>
        <div style={playerListGrid}>
          {players.map((player, index) => (
            <div style={playerItemStyles} key = {index}>{player.userName} </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default PlayerList
