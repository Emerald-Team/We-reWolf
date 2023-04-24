import React, { useState } from "react";
import Link from "next/link";
import JoinModal from "../comps/modals/joinModal.js";

const Join = () => {
  //state variables
  const [gameCode, setGameCode] = useState("");
  const [showJoinModal, setJoinModal] = useState(false);

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
  };

  const leftBoxStyle = {
    width: "30%",
    height: "40%",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    padding: "1rem",
    marginRight: "1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const rightBoxStyle = {
    width: "40%",
    height: "80%",
    backgroundColor: "rgba(64, 66, 64, 0.7)",
    padding: "1rem",
    color: "white",
  };

  const buttonStyle1 = {
    border: "1px solid black",
    borderRadius: "50px",
    marginBottom: "0.5rem", // Add margin-bottom for spacing
    padding: "1rem",
    fontSize: "2rem",
    backgroundColor: "yellowGreen",
  };
  const buttonStyle2 = {
    border: "1px solid black",
    borderRadius: "50px",
    marginBottom: "0.5rem", // Add margin-bottom for spacing
    padding: "1rem",
    fontSize: "2rem",
    backgroundColor: "violet",
  };

  const inputStyle = {
    display: "block",
    width: "100%",
    marginBottom: "0.5rem",
    padding: "0.25rem",
    backgroundColor: "white",
    border: "1px solid black",
    borderRadius: "5px",
  };

  return (
    <>
      <div style={containerStyle}>
        <div style={leftBoxStyle}>
          <Link href="/lobby">
            <button style={buttonStyle1}>Host Game</button>
          </Link>

          <button onClick={() => setJoinModal(true)} style={buttonStyle2}>
            Join Game
          </button>
          <input type="text" placeholder="Lobby Code" style={inputStyle} />
        </div>
        <div style={rightBoxStyle}>
          <h1>RULES</h1>
          <p>This is the text section with the title </p>
        </div>
      </div>
      <JoinModal open={showJoinModal} onClose={() => setJoinModal(false)} />
    </>
  );
};

export default Join;
