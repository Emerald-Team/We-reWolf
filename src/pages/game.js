import { useMemo, useEffect, useState } from "react";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
import Image from "next/image";
import Avatar from "/src/comps/avatar.js"
import Timer from "/src/comps/timer.js"
import axios from 'axios'
import * as _ from "lodash"

const interval = 10;
const phases = ['night', 'day'];


export default function Game() {
  const [gameData, setGameData] = useState({
    gameID: '1234',
    username: 'TheBigBadBill',
    users: [
       {
        username: 'TheBigBadBill',
        role: 'werewolf',
        isAlive: true,
        votes: 0
      },
      {
        username: 'TheRealJae',
        role: 'villager',
        isAlive: true,
        votes: 0
      },
      {
        username: 'SnarlsBarkley',
        role: 'werewolf',
        isAlive: true,
        votes: 0
      },
      {
        username: 'ZackAttack',
        role: 'villager',
        isAlive: true,
        votes: 0
      },
      {
        username: 'GuyWithTuba',
        role: 'villager',
        isAlive: false,
        votes: 0
      },
      {
        username: 'Tr3nB@cy',
        role: 'villager',
        isAlive: true,
        votes: 0
      },
      {
        username: 'Chordata',
        role: 'villager',
        isAlive: true,
        votes: 0
      },
      {
        username: 'CoachLaner',
        role: 'villager',
        isAlive: true,
        votes: 0
      }
    ],
    phase: 'night',
  })
  const [gameStarted, setGameStarted] = useState(false)
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [timeLeft, setTimeLeft] = useState(interval); //dont need
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [phase, setPhase] = useState('nights')
  const [players, setPlayers] = useState([])
  const [thisPlayer, setThisPlayer] = useState({})
  // console.log('player role', thisPlayer.role)
  const [isWerewolf, setIsWerewolf] = useState(thisPlayer.role === 'werewolf')
  const [selected, setSelected] = useState(null);
  const [lastSelected, setLastSelected] = useState(null);
  const [gameID, setGameID] = useState('0')


const createNewGame = async (users, phase) => {
  console.log('creating new game.......... ')
  try {
    const gameState = await axios.post(`/api/createGame/createGame`, {
      users,
      phase
    })
    setGameData(gameState.data)
  } catch (error) {
    console.error('ERROR CREATING GAME: ', error)
    throw error
  }
}

async function getGameState(gameID) {
  const response = await fetch(`/api/gameState/${gameID}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  const gameState = await response.json();
  return gameState;
}

useEffect(() => {
  console.log(gameID)
}, [gameID])
const createNewGameOnce = _.once(createNewGame);

useEffect(() => {
  console.log(thisPlayer)
}, [thisPlayer])


  useEffect(() => {
    if (gameData !== null) {
     setPlayers(gameData.users)
     setPhase(gameData.phase)
     //setGameID(gameData.gameId)
     setGameID('1234')
     setThisPlayer(gameData.users.filter(user => user.username === gameData.users[0].username)[0])
    }
  }, [gameData])

  useEffect(() => {
    setIsWerewolf(thisPlayer.role === 'werewolf')
    console.log('am i alive? ', thisPlayer.isAlive)
  }, [thisPlayer])

  useEffect(() => {
    if (gameStarted === false) {
      createNewGameOnce(gameData.users, gameData.phase)
        .then((gameState) => {
          setGameStarted(true)
        })
        .catch((err) => console.error(err))
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const fetchedGameState = await getGameState(gameID)
        setGameData(fetchedGameState)
      } catch (err) {
        console.error(err)
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleEndPhase = function(phaseEnded) {
    console.log('handling phase end, ', phaseEnded);
    if (!thisPlayer.isAlive) {
      console.log('too dead, sry');
      return;
    }
    switch (phaseEnded) {
      case 'night':
        console.log('The night has ended. Here is the result:\n');
        break;
      case 'day':
        console.log('The day has ended. Here is the result:\n');
        break;
      default:
        console.log(`Sorry, we are out of ${phaseEnded}.`);
    }
    // if (phaseEnded === 'night') {
    //   console.log('night votes', players.reduce((accum, player) => {
    //     if (player.votes > 0) {
    //       return player.votes > accum.votes ? player : accum
    //     } else {
    //       return null
    //     }
    //   }))
    // } else if (phaseEnded === 'day') {
    //   console.log('day votes', )
    // } else {
    //
    // }
  }
  useEffect(() => {
    console.log('players', players)
  }, [players])
  useEffect(() => {
    setPlayers(players.map(player => {
      if (player === selected) {
        player.votes++
        console.log(player)
        return player
      } else if (selected !== lastSelected) {
        player.votes--
        console.log(player)
        return player;
      } else {
        return player;
      }
    }
  ))
  }, [selected])
  useEffect(() => {
    setPhase(phases[phaseIndex]);
  }, [phaseIndex])
  useEffect(() => {
    // console.log('phase', phase)
    handleEndPhase(phases[(phaseIndex - 1) % phases.length])
  }, [phase])

  useEffect(() => {
    // const intervalId = setInterval(() => {
      if (timeLeft < 1) {
    //     setTimeLeft(interval); // set initial time left to 10 seconds
        setPhaseIndex((phaseIndex + 1) % phases.length)
      } else {
        console.log(timeLeft)
        setTimeLeft(timeLeft - 1);
      }
    // }, 1000);
    // return () => clearInterval(intervalId);
  }, [timeLeft]);

  const getMessages = () => {
    const options = {
      method: "GET",
      url: `api/messages/${gameID}`
    }
    axios(options)
      .then(res => {
        setMessages(res.data)
      })
      .catch(console.log)
  }
  const handleText = (e) => {
    setText(e.target.value)
  }
  const handleSend = () => {
    const payload = {
      user: thisPlayer.username,
      body: text,
      visibleTo: {
        all: true
      }
    }
    const options = {
      method: 'POST',
      url: `api/messages/${gameID}`,
      data: payload
    }
    axios(options)
      .then(res => {
        setText('')
        setMessages(res.data)
      })
      .catch(console.log)
  }
  useEffect(() => {
    getMessages()
  })

  return (
    <>
      <div style={containerStyle}>
        <div style={phase === 'night' ? gameContainerStyleNight : gameContainerStyle}>
          <div style={boxContainerStyle}>
            <div style={phase === 'night' ? roleStyleNight : roleStyle}>
              <p>{thisPlayer.role}</p>
            </div>
            <div style={phase === 'night' ? timerStyleNight : timerStyle}>
              <Timer phaseIndex={phaseIndex} setPhaseIndex={setPhaseIndex} phases={phases}/>
            </div>
            <div style={dayStyleNight}>
              <p>{phase}</p>
              {/* Day*/}
            </div>
          </div>
          <div className="players" style={phase === 'night' ? playerContainerNight : playerContainer}>
            {players !== [] && players.map(
              (player, i) =>
                <Avatar key={i} player={player} thisPlayerCanSelect={thisPlayer.isAlive} selected={selected} setSelected={setSelected} lastSelected={lastSelected} setLastSelected={setLastSelected} gameID={gameID} />
              )
            }
          </div>
          <small style={phase === 'night' ? werewolfTextContainerNight : werewolfTextContainer}>
            Werewolves: {players.map(player => {
              if (isWerewolf && player.role === 'werewolf' && phase === 'night') {
                return player.username + ' '
              } else {
                return ''
              }
            })}
          </small>
        </div>
        <div style={chatContainerStyle}>
          <div style={chatContentContainerStyle}>
            {messages.map((chat) => {
              return (
                <p style={textStyle} key={chat._id}>
                  {chat.user}: {chat.body}
                </p>
              )
            })}
          </div>
        </div>
      </div>
      <div style={inputContainerStyle}>
        <input
          type="text"
          onChange={handleText}
          value={text}
          style={inputStyle}
          placeholder="Type your message here..."
        />
        <button style={buttonStyle} onClick={handleSend}>Send</button>
      </div>
    </>
  )
}
var textStyle = {
  color: "white",
  textAlign: "left",
  fontSize: "24px",
}

var containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "80vh",
}

var gameContainerStyle = {
  backgroundColor: "rgba(256, 256, 256, 0.7)",
  width: "45%",
  height: "80vh",
  marginLeft: "100px",
  marginRight: "50px",
  marginBottom: "20px",
  marginTop: "40px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  position: "relative",
  overflowY: "auto",

}

var gameContainerStyleNight = {
  backgroundColor: "rgba(64, 66, 64, 0.7)",
  width: "45%",
  height: "80vh",
  marginLeft: "100px",
  marginRight: "50px",
  marginBottom: "20px",
  marginTop: "40px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  position: "relative",
  overflowY: "auto",
}

var boxContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  padding: "10px",
}

var roleStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.1)",
  height: "50px",
  margin: "0 5px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flex: "0.2",
}

var roleStyleNight = {
  backgroundColor: "rgba(213, 222, 213, 0.1)",
  height: "50px",
  margin: "0 5px",
  display: "flex",
  color: "white",
  justifyContent: "center",
  alignItems: "center",
  flex: "0.2",
}

var timerStyle = {
  backgroundColor: "transparent",
  height: "100px",
  margin: "0 5px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flex: "1",
}

var timerStyleNight = {
  backgroundColor: "transparent",
  height: "100px",
  margin: "0 5px",
  display: "flex",
  color: "white",
  justifyContent: "center",
  alignItems: "center",
  flex: "0.2",
}

var dayStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.1)",
  height: "50",
  margin: "0 5px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flex: "0.2",
}

var dayStyleNight = {
  backgroundColor: "rgba(213, 222, 213, 0.1)",
  height: "50px",
  margin: "0 5px",
  display: "flex",
  color: "white",
  justifyContent: "center",
  alignItems: "center",
  flex: "0.2",
}

var playerContainer = {
  display: "grid",
  marginTop: "30px",
  gridTemplateColumns: "repeat(5, auto)",
  gap: "20px",
}

var playerContainerNight = {
  display: "grid",
  marginTop: "30px",
  gridTemplateColumns: "repeat(5, auto)",
  gap: "20px",
  color: "white",
}



var werewolfTextContainer = {
  position: "absolute",
  bottom: "10px",
  right: "10px",
  textAlign: "right",
}

var werewolfTextContainerNight = {
  position: "absolute",
  bottom: "10px",
  right: "10px",
  textAlign: "right",
  color: "white",
}

var chatContainerStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  width: "55%",
  minWidth: "45%",
  height: "70vh",
  marginLeft: "auto",
  marginRight: "100px",
  marginBottom: "20px",
  marginTop: "30px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "16px",
  overflowY: "auto",
  textAlign: "left",
}

var chatContentContainerStyle = {
  flex: "1",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
}

var inputContainerStyle = {
  display: "flex",
  marginTop: "16px",
  justifyContent: "flex-end",
  marginRight: "100px",
}

var inputStyle = {
  backgroundColor: "grey",
  color: "white",
  border: "none",
  flex: "1",
  padding: "8px",
  minWidth: "8%",
  maxWidth: "38%",
}

var buttonStyle = {
  backgroundColor: "grey",
  color: "white",
  border: "none",
  marginLeft: "8px",
  padding: "8px",
}
