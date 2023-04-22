import { useState, useEffect } from "react"
import GameSettings from "../comps/GameSettings";
import PlayerList from "../comps/PlayerList";
export default function Lobby() {


const [count, setCount] = useState(0);
//this will be an array of all the users IDs
//use the .length property to update the current # of players in teh game in the PlayerList component.
const [playersConnected, setPlayersConnected] = useState([]);
useEffect(() => {
}, [count])
const [gameLobbyText, setGameLobbyText] = useState("");
function gameLobbyChangeHandler() {
  setGameLobbyText(event.target.value)
}
  return (
    <>

    <div style = {{backgroundColor: "white"}}>

      <h1>Lobby</h1>
      <div style = {{display: "flex", flexDirection: "row"}}>
        <PlayerList count = {count}/>
        <GameSettings count = {count} setCount ={setCount} />
      </div>
      <input style = {{border: "solid"}} onChange = {gameLobbyChangeHandler}value = {gameLobbyText}></input>
      <button onClick = {() => {navigator.clipboard.writeText(gameLobbyText)}}>Copy To Clipboard</button>
      </div>


    </>
  );
}
