import React, {useState} from "react";
import Link from "next/link"
const JoinModal = ({ open, onClose}) => {
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
      transform:" translate(-50%, -50%)",
      backgroundColor: "white",
      padding:" 50px",
      zIndex:" 1000"
  }


  return (
    <>
      <div style ={overlay}/>
        <div style ={joinStyle}>
          THIS IS A JOIN modals
          <br>
          </br><button onClick = {onClose}>Close Button</button><br></br>
          <input placeholder= "enter game code here"/>
          <Link href="/lobby">
          <button>Join</button>
          </Link>
       </div>
    </>
  );
}

export default JoinModal;
