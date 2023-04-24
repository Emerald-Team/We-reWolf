import React, { useState, useEffect } from "react";
import GameSettings from "../comps/gameSettings";
import PlayerList from "../comps/playerList";

export default function Lobby() {
  const [count, setCount] = useState(0);
  const [playersConnected, setPlayersConnected] = useState([]);
  const [gameLobbyText, setGameLobbyText] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  function gameLobbyChangeHandler(event) {
    setGameLobbyText(event.target.value);
  }
  function getCookie(name) {
    let value = `; ${document.cookie}`;
    let parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  useEffect(() => {}, [count]);
  useEffect(() => {
    if (getCookie("isHost") === 'false') {
      setButtonDisabled(true);
    }
  }, []);

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <div style={titleStyle}>Lobby</div>
        <div style={contentStyle}>
          <div style={listStyle}>
            <h2 style={listHeaderStyle}>Player List</h2>
            <PlayerList count={count} />
          </div>
          <div style={listStyle}>
            <h2 s
            tyle={listHeaderStyle}>Role List</h2>
            <GameSettings
              count={count}
              buttonDisabled={buttonDisabled}
              setCount={setCount}
            />
          </div>
        </div>
        <div style={footerStyle}>
          <button
            onClick={() => {
              navigator.clipboard.writeText(gameLobbyText);
            }}
            style={buttonStyle}
          >
            Copy To Clipboard
          </button>
          <input
            style={inputStyle}
            onChange={gameLobbyChangeHandler}
            value={gameLobbyText}
          ></input>
          <button disabled={buttonDisabled} style={buttonStyle}>
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
}

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "80vh",
};

const boxStyle = {
  width: "60vw",
  height: "80vh",
  backgroundColor: "rgba(255, 255, 255, 0.75)",
  padding: "20px",
  borderRadius: "4px",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  marginTop: "50px",
};

const titleStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "20px",
  textAlign: "center",
};

const contentStyle = {
  display: "flex",
};

const listStyle = {
  flex: "1",
  border: "1px solid darkgrey",
  minHeight: "60vh",
  borderRadius: "4px",
  padding: "10px",
  marginRight: "20px",
};

const listHeaderStyle = {
  marginBottom: "10px",
};

const footerStyle = {
  marginTop: "20px",
  display: "flex",
  alignItems: "center",
};

const inputStyle = {
  flex: "1",
  padding: "8px",
  backgroundColor: "white",
  border: "1px solid black",
  borderRadius: "50px",
};

const buttonStyle = {
  marginLeft: "10px",
  padding: "8px 16px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  cursor: "pointer",
};
