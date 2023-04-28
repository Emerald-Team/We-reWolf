import React, { useState, useEffect } from "react"
import Link from "next/link"
import JoinModal from "../../comps/modals/joinModal.js"
import axios from 'axios';

const Join = () => {
  //state variables
  const [gameCode, setGameCode] = useState("")
  const [showJoinModal, setJoinModal] = useState(false);
  const [username, setUserName] = useState('');


  function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

  function getUserName () {
    setUserName(window.localStorage.user);
    console.log('USERNAME', username)
  }

  function hostHandler() {
    document.cookie = `isHost = true`;
    axios.post(`http://localhost:3000/api/lobby/${gameCode}`, {user:  username}).then((res) => console.log('RES from HostLobby POST Req',res)).catch((err) => console.log(err));
  }



  useEffect(() => {
    setGameCode(getRandomInt(1000))
    getUserName();
  }, [])

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
  }
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
  }
  const rightBoxStyle = {
    width: "40%",
    height: "80%",
    backgroundColor: "rgba(64, 66, 64, 0.7)",
    padding: "1rem",
    color: "white",
    textAlign: "center",
    overflowY: "auto",
  }
  const buttonStyle1 = {
    border: "0.5px solid black",
    borderRadius: "50px",
    marginBottom: "0.5rem",
    padding: "1rem",
    fontSize: "2rem",
    backgroundColor: "#5adbb5",
  }
  const buttonStyle2 = {
    border: "0.5px solid black",
    borderRadius: "50px",
    marginBottom: "0.5rem",
    padding: "1rem",
    fontSize: "2rem",
    backgroundColor: "#ffbd03",
  }
  const inputStyle = {
    display: "block",
    width: "100%",
    marginBottom: "0.5rem",
    padding: "0.25rem",
    backgroundColor: "white",
    border: "1px solid black",
    borderRadius: "5px",
  }
  const rulesStyle = {
    fontSize: "200%",
    fontWeight: "bold",
    textDecorationLine: "underline",
  }
  const change = {
    marginTop: "20px",
    fontSize: "150%",
    fontWeight: "bold",
  }
  const roleRulesStyle = {
    marginLeft: "20px",
    textAlign: "left",
  }

  return (
    <>
      <div style={containerStyle}>
        <div style={leftBoxStyle}>
          <Link href={`/joinGameLobby/${gameCode}`}>
            <button
              className="hostButton"
              onClick={hostHandler}
              style={buttonStyle1}
            >
              Host Game
            </button>
          </Link>

          <button
            className="joinButton"
            onClick={() => setJoinModal(true)}
            style={buttonStyle2}
          >
            Join Game
          </button>
        </div>
        <div style={rightBoxStyle}>
          <h1 style={rulesStyle}>RULES</h1>
          <div style={roleRulesStyle}>
            <h2 style={change}>Objective: </h2>
            <p>
              For the Villagers, Doctor, and Seer: Identify and vote out the
              Werewolves to save the village.
            </p>
            <p>
              For the Werewolves: Eliminate all Villagers and other opposing
              roles.
            </p>
            <h2 style={change}>Roles:</h2>
            <p>
              Werewolves: Typically, there are 2 or more players who are
              designated as Werewolves. They work together to eliminate other
              players during the game. The Werewolves know each others identity
              and can communicate secretly to plan their strategy.
            </p>
            <p>
              Villagers: The majority of players are Villagers. They do not have
              any special abilities other than trying to identify and vote out
              the Werewolves during the game.
            </p>
            <p>
              Doctor: The Doctor is a special role on the side of the Villagers.
              The Doctor has the ability to protect one player each night from
              being eliminated by the Werewolves. The Doctors goal is to save as
              many Villagers as possible.
            </p>
            <p>
              Seer: The Seer is another special role on the side of the
              Villagers. The Seer has the ability to investigate one players
              identity each night to determine if they are a Villager or a
              Werewolf. The Seers goal is to gather information and use it to
              help the Villagers identify the Werewolves.
            </p>
            <h2 style={change}>GamePlay: </h2>
            <p>
              1. The game is played in rounds, with each round consisting of two
              phases: Day and Night.
            </p>
            <p>
              2. During the Day phase, all players, including the Villagers,
              Doctor, and Seer, openly discuss and vote on who they think is a
              Werewolf. Players can use their observations, deductions, and any
              special abilities they may have to make their case.
            </p>
            <p>
              3. At the end of the Day phase, the player with the most votes
              against them is dead and eliminated from the game. If there is a
              tie, no one is dead.
            </p>
            <p>
              4. During the Night phase, the Werewolves secretly choose a player
              to eliminate from the game. The Doctor can choose a player to
              protect, and the Seer can investigate a players identity.
            </p>
            <p>
              5. The next Day phase begins, and the cycle continues until either
              all Werewolves are eliminated, or the Werewolves outnumber the
              Villagers.
            </p>
            <p>
              6. The game continues until one of the win conditions is met:
              either the Werewolves are all eliminated, or the Werewolves
              outnumber the Villagers.
            </p>
          </div>
        </div>
      </div>
      <JoinModal
        open={showJoinModal}
        onClose={() => setJoinModal(false)}
        user = {username}
      />
    </>
  )
}

export default Join
