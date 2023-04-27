import { useMemo, useEffect, useState } from "react";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
import Image from "next/image";
import Avatar from "/src/comps/avatar.js"
import Timer from "/src/comps/timer.js"
import axios from 'axios'
import * as _ from "lodash"
import { useRouter } from 'next/router';

const PHASE_LENGTH = 10;
const phases = ['night', 'day'];

const dayStr = 'Day 🔆';
const nightStr = 'Night 🌙';

const wwStr = 'Werewolf 🐺';
const vilStr = 'Villager 🧑‍🌾';
const seeStr = 'Seer 🔮';
const docStr = 'Doctor 🧑‍⚕️';

export default function Game() {
  const router = useRouter()

  const [gameData, setGameData] = useState({
    gameID: '1234',
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
  const [gameID, setGameID] = useState(router.query.gameID)
  const [gameStarted, setGameStarted] = useState(false)
  const [user, setUser] = useState('')
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [phase, setPhase] = useState('night')
  const [phaseText, setPhaseText] = useState(nightStr)
  const [players, setPlayers] = useState([])
  const [thisPlayer, setThisPlayer] = useState({})
  const [isWerewolf, setIsWerewolf] = useState(thisPlayer.role === 'werewolf')
  const [selected, setSelected] = useState(null);
  const [lastSelected, setLastSelected] = useState(null);
  const roleToStr = function(role) {
    switch(role) {
      case 'werewolf':
        return wwStr;
        break;
      case 'villager':
        return vilStr;
        break;
      case 'seer':
        return seeStr;
        break;
      case 'doctor':
        return docStr;
        break;
      default:
        console.log(`Sorry, we are out of ${role}.`);
    }
  }
  const [roleStr, setRoleStr] = useState(roleToStr(thisPlayer.role));
  // const [gameID, setGameID] = useState('1234')

  const createNewGame = async (gameID, users, phase) => {
    console.log('creating new game.......... ')
    try {
      const gameState = await axios.post(`/api/createGame/createGame`, {
        gameID,
        users,
        phase
      })
      console.log('Game state saved:', gameState)
    } catch (error) {
      console.error('ERROR CREATING GAME: ', error)
      throw error
    }
  }

  const getGameState = async function()  {
    if (gameID) {
      const response = await fetch(`/api/gameState/${gameID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      } else {
        const gameState = await response.json();
        if (gameState !== null) {
          // console.log('GAME STATE IN getGameState', gameState)
          setGameData(gameState);
        }
      }
      // return gameState;

    }
    setTimeout(getGameState, 1000)
  }

  const createNewGameOnce = _.once(createNewGame);

  useEffect(() => {
    if (gameData !== null) {
     setPlayers(gameData.users)
     setPhase(gameData.phase)
    //  setGameID(gameData.gameID) //should we be setting this here or from router.query line 79
     setThisPlayer(gameData.users.filter(user => user.username === gameData.users[0].username)[0])
    }
  }, [gameData])

  useEffect(() => {
    setIsWerewolf(thisPlayer.role === 'werewolf')
    // console.log(thisPlayer)
    // console.log('am i alive? ', thisPlayer.isAlive)
    setRoleStr(roleToStr(thisPlayer.role));
  }, [thisPlayer])

  const werewolvesHaveWon = function () {
    const numWerewolves = players.filter(user => user.role === 'werewolf').length;
    const numVillagers = players.filter(user => user.role !== 'werewolf').length;
    return numWerewolves === numVillagers;
  }
  const villagersHaveWon = function () {
    const numWerewolves = players.filter(user => user.role === 'werewolf').length;
    return numWerewolves === 0;
  }

  const findPlayersWithMostVotes = function(users) {
    let maxVotes = -1
    let playersWithMostVotes = []

    users.forEach((user) => {
      if (user.votes > maxVotes) {
        maxVotes = user.votes
        playersWithMostVotes = [user]
      } else if (user.votes === maxVotes) {
        playersWithMostVotes.push(user)
      }
    })
    return playersWithMostVotes
  }

  const killUser = async function() {
    try {
    if (gameData !== null) {
      // console.log(gameData, '---------GAME DATA IN KILLUSER----------')
    const playersWithMostVotes = findPlayersWithMostVotes(gameData.users)
      console.log(playersWithMostVotes)
    if (playersWithMostVotes.length === 1) {
      const response = await fetch(`/api/killPlayer/${gameID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gameID: gameID,
          username: playersWithMostVotes[0].username
        })
      })
      const {success, data, message} = await response.json()
      if (!success) {
        throw new Error(message)
      }
    }
  }
   } catch (error) {
      console.error(error)
    }
  }

  const handleEndPhase = async function(phaseEnded) {
    console.log('handling phase end, ', phaseEnded);
    switch (phaseEnded) {
      case 'night':
        console.log('The night has ended. Here is the result:\n');
        // await killUser()
        if (werewolvesHaveWon()) {
          //route to ww end screen
          console.log('Werewolves Win!\n');
        }
        break;
      case 'day':
        console.log('The day has ended. Here is the result:\n');
        // await killUser()
        if (werewolvesHaveWon()) {
          //route to ww end screen
          console.log('Werewolves Win!\n');
        } else if (villagersHaveWon()) {
          //route to vil end screen
          console.log('Villagers Win!\n');
        }
        break;
      default:
        console.log(`Sorry, we are out of ${phaseEnded}. (Phase ended and is not one of these:)\n`, phases);
    }
  }

  useEffect(() => {
    setPhase(phases[phaseIndex]);
  }, [phaseIndex])

  useEffect(() => {
    console.log('handle phase end for phase index: ', (phases.length + phaseIndex) % phases.length)
    handleEndPhase(phases[(phases.length + phaseIndex) % phases.length])
    if (phase === 'night') {
      setPhaseText(nightStr)
    } else if (phase === 'day') {
      setPhaseText(dayStr)
    }
  }, [phase])

  //hardcodes for testing
  let userPermissions = [user, 'all', 'werewolf', 'dead']
  let timeOfDay = 'night'
  let userRole = 'werewolf'

  useEffect(() => {
    //upper useEffect
    if (gameStarted === false && gameData !== null) {
      createNewGameOnce(gameID, gameData.users, gameData.phase)
        .then((gameState) => {
          setGameStarted(true)
        })
        .catch((err) => console.error(err))
    }

    // lower useEffect
    let storedUser = window.localStorage.getItem('user')
    setUser(storedUser)
    if (gameData !== null) {
      // setPlayer(gameData.users.filter(user => (user.username === storedUser))[0])
      setPlayers(gameData.users)
    }
    getGameState()
  }, [])

  useEffect(() => {
    console.log(gameID)
    let options = {
      method: 'GET',
      url: `http://localhost:3000/api/gameState/${gameID}`
    }
    axios(options)
      .then(res => {
        // console.log(res.data, '------returned from useeffect-------')
        setGameData(res.data)
      });
  }, [gameID])

  useEffect(() => {
    if (!router.isReady) {
      return
    }
    console.log('setting gameID to ', router.query.gameID)
    setGameID(router.query.gameID)
    getMessages(router.query.gameID)
  }, [router.isReady])
  // const userInfo = gameData.user
  // const username = userInfo.name

  const getMessages = (inputID) => {
    inputID = inputID || gameID
    if (!!inputID) {
      const options = {
        method: "GET",
        url: `http://localhost:3000/api/messages/${inputID}`
      }
      axios(options)
        .then(res => {
          if (!!res.data[0]) {
            setMessages(res.data)
            if (!!gameID) {
              setTimeout(getMessages, 1000)
            }
          }
        })
        .catch(console.log)
    } else {
      setTimeout(getMessages, 3000)
    }
  }

  const handleText = (e) => {
    setText(e.target.value)
  }

  const handleSend = () => {
    let visibleTo = 'all'
    if(phase === 'night' && userRole === 'werewolf'){
      visibleTo = 'werewolf'
    } else if(userRole === 'dead'){
      visibleTo = 'dead'
    }

    const payload = {
      user: user,
      body: text,
      visibleTo: visibleTo
    }
    const options = {
      method: 'POST',
      url: `http://localhost:3000/api/messages/${router.query.gameID}`,
      data: payload
    }
    axios(options)
      .then(res => {
        setText('')
        setMessages(res.data)
      })
      .catch(console.log)
  }

  const resetVotes = async function(gameID) {
    const response = await fetch(`/api/resetVotes/${gameID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      console.error(`Error reseting votes: ${response.statusText}`)
    } else {
      const updatedGameState = await response.json()
      console.log(updatedGameState, '----UPDATED GAME STATE-------')
    }
  }

  const onNextPhase = async function() {
    await killUser()
    await resetVotes(gameID);
    setPhaseIndex((phaseIndex + 1) % phases.length)
  }

  return (
    <>
      <div style={containerStyle}>
        <div style={phase === 'night' ? gameContainerStyleNight : gameContainerStyle}>
          <div style={boxContainerStyle}>
            <div style={phase === 'night' ? roleStyleNight : roleStyle}>
              <p>You are: {roleStr}</p>
            </div>
            <div style={phase === 'night' ? timerStyleNight : timerStyle}>
              <Timer period={PHASE_LENGTH} callback={onNextPhase} />
            </div>
            <div style={dayStyleNight}>
              <p>{phaseText}</p>
              {/* Day*/}
            </div>
          </div>
          <div className="players" style={phase === 'night' ? playerContainerNight : playerContainer}>
            {players.map(
              (player, i) =>
                <Avatar
                  key={i}
                  player={player}
                  thisPlayerCanSelect={thisPlayer.isAlive}
                  selected={selected}
                  setSelected={setSelected}
                  setLastSelected={setLastSelected}
                  gameID={gameID}
                />
              )
            }
          </div>
          {isWerewolf && <small style={phase === 'night' ? werewolfTextContainerNight : werewolfTextContainer}>
            Werewolves: {players.map(player => {
              if (isWerewolf && player.role === 'werewolf') {
                return player.username + ' '
              } else {
                return ''
              }
            })}
          </small>}
        </div>
        <div style={chatContainerStyle}>
          <div style={chatContentContainerStyle}>
            {messages.filter(message => (userPermissions.includes(message.visibleTo))).map((message) => {
              let textColor = 'text-slate-300'
              if(message.visibleTo === 'werewolf'){
                textColor = 'text-blue-700'
              } else if(message.visibleTo === 'dead'){
                textColor = 'text-zinc-500'
              } else if(message.visibleTo === user){
                textColor = 'text-pink-700'
              }
              return (
                <p className={`text-2xl ${textColor}`} key={message._id}>
                  {message.user}{message.visibleTo === user ? '(direct)' : ''}: {message.body}
                </p>
              )}
            )}
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
          onKeyPress={(e)=>{
            if(e.charCode === 13) {
              handleSend()
            }
          }}
        />
        <button className="chatSend" style={buttonStyle} onClick={handleSend}>Send</button>
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
