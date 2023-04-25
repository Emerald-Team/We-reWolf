import React, { useState } from "react";
import Link from "next/link";




const JoinModal = ({ open, onClose, setCookie }) => {

  const [gameCode, setGameCode] = useState(0);

  if (!open) return null;
  const overlay = {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "grey",
    opacity: "0.5",
    zIndex: "1000",
  }
  const joinStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: " translate(-50%, -50%)",
    backgroundColor: "white",
    padding: " 50px",
    zIndex: " 1000",
  }
  const inputStyle = {
    flex: "1",
    padding: "8px",
    backgroundColor: "white",
    border: "1px solid black",
    borderRadius: "50px",
  }

  const buttonStyle = {
    marginLeft: "10px",
    padding: "8px 16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  }

  const buttonStyleX = {
    marginLeft: "10px",
    padding: "8px 16px",
    backgroundColor: "transparent",
    color: "black",
    border: "none",
    cursor: "pointer",
    position: "absolute",
    right: "1rem",
    top: "1rem",
  }
  function joinHandler(e){
    setGameCode(e.target.value)
  }

  return (
    <>
      <div style={overlay} />
      <div style={joinStyle}>
        Input Game Code
        <br></br>
        <button style={buttonStyleX} onClick={onClose}>
          X
        </button>
        <br></br>
        <input
        style={inputStyle}
        placeholder="enter game code here"
        onChange = {joinHandler}
        value = {gameCode}/>

        <Link href={`/joinGameLobby/${gameCode}`}>
          <button
          onClick = {setCookie}
          style={buttonStyle}>Join</button>
        </Link>
      </div>
    </>
  )
}

export default JoinModal
