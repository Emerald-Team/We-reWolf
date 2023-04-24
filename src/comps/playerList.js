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

const PlayerList = ({ count }) => {
  return (
    <>
      <div style={playerListStyles}>
        <h1>
          <b>Player List</b> <span>1/{count}</span>
        </h1>
        <div style={playerListGrid}>
          <div style={playerItemStyles}>BadBill</div>
          <div style={playerItemStyles}>ZachAttack</div>
          <div style={playerItemStyles}>Chordata</div>
          <div style={playerItemStyles}>PopeShaq</div>
          <div style={playerItemStyles}>theRealJae</div>
        </div>
      </div>
    </>
  )
}

export default PlayerList
