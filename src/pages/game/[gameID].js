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

const dayStr = 'Day🔆';
const nightStr = 'Night🌙';

const wwStr = 'Werewolf🐺';
const vilStr = 'Villager🧑‍🌾';
const seeStr = 'Seer🔮';
const docStr = 'Doctor🧑‍⚕️';

export default function Game() {
  const router = useRouter()


  const [gameData, setGameData] = useState({
    gameID:  router.query.gameID,
    users: [
      {
        username: 'TheBigBadBill',
        role: 'werewolf',
        permissions: ['day, night'],
        isAlive: true,
        votes: 0
      },
      {
        username: 'TheRealJae',
        role: 'villager',
        permissions: ['day'],
        isAlive: true,
        votes: 0
      },
      {
        username: 'SnarlsBarkley',
        role: 'werewolf',
        permissions: ['day, night'],
        isAlive: true,
        votes: 0
      },
      {
        username: 'ZackAttack',
        role: 'villager',
        permissions: ['day'],
        isAlive: true,
        votes: 0
      },
      {
        username: 'GuyWithTuba',
        role: 'villager',
        permissions: ['day'],
        isAlive: false,
        votes: 0
      },
      {
        username: 'Tr3nB@cy',
        role: 'villager',
        permissions: ['day'],
        isAlive: true,
        votes: 0
      },
      {
        username: 'Chordata',
        role: 'villager',
        permissions: ['day'],
        isAlive: true,
        votes: 0
      },
      {
        username: 'CoachLaner',
        role: 'villager',
        permissions: ['day'],
        isAlive: true,
        votes: 0
      }
    ],
    phase: 'night',
  })
  const [gameID, setGameID] = useState(router.query.gameID)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [user, setUser] = useState('')
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [phase, setPhase] = useState('night')
  const [phaseText, setPhaseText] = useState(nightStr)
  const [players, setPlayers] = useState([])
  const [thisPlayer, setThisPlayer] = useState(      {
    username: 'SnarlsBarkley',
    role: 'villager',
    permissions: ['SnarlsBarkley', 'all'],
    isAlive: true,
    votes: 0
  })
  const [isWerewolf, setIsWerewolf] = useState(thisPlayer.role === 'werewolf')
  const [selected, setSelected] = useState(null);
  const [lastSelected, setLastSelected] = useState(null);
  const [gameDone, setGameDone] = useState(false)
  const [wolfWins, setWolfWins] = useState(false)
  const [villWins, setVillWins] = useState(false)
  useEffect(() => {
    setGameID(router.query.gameID)
  }, [])
  const roleToStr = function(role) {
    // console.log('this player and role', thisPlayer, thisPlayer.role)
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
        console.log(`NOT SORRY, we are out of ${role}.`);
    }
  }
  const [roleStr, setRoleStr] = useState(roleToStr(thisPlayer.role));

  const getGameState = async function()  {
    // console.log('getting game state')
    if (gameID) {
      const response = await fetch(`/api/gameState/${gameID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // console.log('response from fetch gameData:\n', response)
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      } else {
        const gameState = await response.json();
        // console.log('GAME STATE IN getGameState: is this null', gameState)
        if (gameState !== null) {
          delete gameState.phase;
          // console.log('GAME STATE IN getGameState: is phase gone?', gameState)
          setGameData(gameState);
                // return gameState;
          // setPlayers(gameState.users)
          // // console.log(gameData, players, '-------IN INIT USEEFFECT------')
          // // setPhase(gameState.phase)
          // //  setGameID(gameData.gameID) //should we be setting this here or from router.query line 79
          // setThisPlayer(gameState.users.filter(user => user.username === gameState.users[0].username)[0])
        }
      }
    }
    setTimeout(getGameState, 1000)
  }

  useEffect(() => {
    // console.log('in gameData useEffect: is this null?\n', gameData)
    if (gameData !== null) {
      setPlayers(gameData.users)
      // console.log(gameData, players, '-------IN INIT USEEFFECT------')
      // setPhase(gameData.phase)
      //  setGameID(gameData.gameID) //should we be setting this here or from router.query line 79
      const thisPlayerArr = gameData.users.filter(user => user.username === localStorage.getItem('user'));
      if (thisPlayerArr[0] !== undefined) {
        setThisPlayer(gameData.users.filter(user => user.username === localStorage.getItem('user'))[0]);
      }
    }
  }, [gameData])

  // useEffect(() => {
  //   if (gameData !== null) {
  //   setPlayers(gameData.users)
  //   }
  // }, [gameData, phaseIndex])


  useEffect(() => {
    if(gameStarted) {
      setIsWerewolf(thisPlayer.role === 'werewolf')
      // console.log(thisPlayer)
      // console.log('am i alive? ', thisPlayer.isAlive)
      setRoleStr(roleToStr(thisPlayer.role));
    }
  }, [thisPlayer])

  const werewolvesHaveWon = function () {
    const numWerewolves = players.filter(user => user.role === 'werewolf' && user.isAlive).length;
    const numVillagers = players.filter(user => user.role !== 'werewolf' && user.isAlive).length;
    console.log('have werewolves won? checking werewolves', numWerewolves, 'to villagers', numVillagers, numWerewolves === numVillagers)
    return numWerewolves === numVillagers;
  }
  const villagersHaveWon = function () {
    const numWerewolves = players.filter(user => user.role === 'werewolf' && user.isAlive).length;
    console.log('have villagers won? checking werewolves', numWerewolves, numWerewolves === 0)
    return numWerewolves === 0;
  }

  const findPlayersWithMostVotes = function(users) {
    let maxVotes = 0
    let playersWithMostVotes = []

    users.filter(user => user.isAlive).forEach((user) => {
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
        console.log('players with the most votes: ', playersWithMostVotes.length, playersWithMostVotes)
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
          });
          const {success, data, message} = await response.json()
          if (!success) {
            throw new Error(message)
          }
          return response;
        } else {
          return {reponse: 'no one player has the most votes', playersWithMostVotes: playersWithMostVotes}
        }
      }
    } catch (error) {
      console.error('error in killUser function:\n', error)
    }
  }

  // const endGame = function(winner) {
  //   console.log('Werewolves Win!\n');
  //   router.push('/end');
  // }
  const handleEndPhase = async function(phaseEnded) {
    if (gameStarted) {
      console.log('handling phase end, ', phaseEnded);
      switch (phaseEnded) {
        case 'night':
          console.log('The night has ended. Here is the result:\n');
          await killUser()
          if (werewolvesHaveWon()) {
            //route to ww end screen
            console.log('Werewolves Win!\n');
            setGameDone(true);
            setWolfWins(true);
            // router.push('/end');
          }
          break;
        case 'day':
          console.log('The day has ended. Here is the result:\n');
          await killUser()
          if (villagersHaveWon()) {
            console.log('Villagers Win!\n');
            setGameDone(true);
            setVillWins(true);
            // router.push('/end');
          } else if (werewolvesHaveWon()) {
            console.log('Werewolves Win!\n');
            setGameDone(true);
            setWolfWins(true);
            // router.push('/end');
          }
          break;
        default:
          console.log(`Sorry, we are out of ${phaseEnded}. (Phase ended and is not one of these:)\n`, phases);
      }
    }
  }

  useEffect(() => {
    console.log('from phase index: has game started?', gameStarted)
    if (gameStarted) {
      setPhase(phases[phaseIndex]);
    }
    console.log(gameData)
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

  useEffect(() => {
    let storedUser = window.localStorage.getItem('user')
    setUser(storedUser)
    if (gameData !== null) {
      // setPlayer(gameData.users.filter(user => (user.username === storedUser))[0])
      setPlayers(gameData.users)
      setGameStarted(true)
      getGameState()
    }
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
    console.log('setting gameID to ', router.query.gameID)
    setGameID(router.query.gameID)
  }, [router.isReady])

  useEffect(() => {
    // if (!router.isReady) {
    //   return
    // }

    getMessages(router.query.gameID)
  }, /*[router.isReady]*/)
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
    if (phase === 'night' && thisPlayer.role === 'werewolf') {
      visibleTo = 'werewolf'
    } else if (thisPlayer.isAlive === false) {
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
      // console.log(updatedGameState, '----UPDATED GAME STATE-------')
    }
    return response;
  }

  const onNextPhase = async function() {
    console.log('end of phase', phase, '\ngameData:\n', gameData)
    await killUser()
    // console.log('kill result:\n', killResult)
    const resetResult = await resetVotes(gameID);
    // console.log('reset result result:\n', resetResult)
    // setPlayers(gameData.players)
    setPhaseIndex((phaseIndex + 1) % phases.length)
  }

  if (!gameDone) {
    return (
      <>
        <div style={containerStyle}>
          <div style={phase === 'night' ? gameContainerStyleNight : gameContainerStyle}>
            <div style={boxContainerStyle}>
              <div style={phase === 'night' ? roleStyleNight : roleStyle}>
                <p>{roleStr}</p>
              </div>
              <div style={phase === 'night' ? timerStyleNight : timerStyle}>
                <Timer period={PHASE_LENGTH} callback={onNextPhase} />
              </div>
              <div style={phase === 'night' ? dayStyleNight : dayStyle}>
                <p>{phaseText}</p>
                {/* Day*/}
              </div>
            </div>
            <div className="players" style={phase === 'night' ? playerContainerNight : playerContainer}>
              {players !== undefined && players.map(
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
              {messages.filter(message => (thisPlayer.permissions.includes(message.visibleTo))).map((message) => {
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
    );
  } else if (gameDone) {
    if (wolfWins) {
      return (
        <>
          <div style={containerStyleEnd}>
            <div style={imageContainerStyleEnd}>
              <Image src="/giphy-1.gif" alt="Your Image" width="400" height="600" />
              <p style={imageStyleEnd}>Werewolves WIN!</p>
            </div>
            <div style={chatContainerStyleEnd}>
              <div style={chatContentContainerStyleEnd}>
                {messages
                  .filter(message => (thisPlayer.permissions.includes(message.visibleTo)))
                  .map((message) => {
                    let textColor = 'text-slate-300'
                    if (message.visibleTo === 'werewolf') {
                      textColor = 'text-blue-700'
                    } else if (message.visibleTo === 'dead') {
                      textColor = 'text-zinc-500'
                    } else if (message.visibleTo === user) {
                      textColor = 'text-pink-700'
                    }
                    return (
                      <p className={`text-2xl ${textColor}`} key={message._id}>
                        {message.user}{message.visibleTo === user ? '(direct)' : ''} : {message.body}
                      </p>
                    )
                  })
                }
              </div>
            </div>
          </div>
          <div style={inputContainerStyleEnd}>
            <input
              type="text"
              style={inputStyleEnd}
              placeholder="Type your message here..."
            />
            <button style={buttonStyle}>Send</button>
          </div>
        </>
      );
    }
    if (villWins) {
      return (
        <>
          <div style={containerStyleEnd}>
            <div style={imageContainerStyleEnd}>
              <Image src="/giphy.gif" alt="Your Image" width="400" height="600" />
              <p style={imageStyleEnd}>Villagers WIN!</p>
            </div>
            <div style={chatContainerStyleEnd}>
              <div style={chatContentContainerStyleEnd}>
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
          <div style={inputContainerStyleEnd}>
            <input
              type="text"
              style={inputStyleEnd}
              placeholder="Type your message here..."
            />
            <button style={buttonStyle}>Send</button>
          </div>
        </>
      );
    }
  }
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
  color: "black",
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

var textStyleEnd = {
  color: "white",
  textAlign: "left",
  fontSize: "24px",
}

var containerStyleEnd = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "80vh",
}

var imageContainerStyleEnd = {
  marginLeft: "auto",
  marginRight: "auto",
}

var imageStyleEnd = {
  textAlign: "center",
  marginTop: "16px",
  color: "white",
  fontSize: "36px",
  fontWeight: "bold",
}

var chatContainerStyleEnd = {
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  width: "35%",
  height: "70vh",
  marginLeft: "auto",
  marginRight: "300px",
  marginBottom: "20px",
  marginTop: "30px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "16px",
  overflowY: "auto",
  textAlign: "left",
}

var chatContentContainerStyleEnd = {
  flex: "1",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
}

var inputContainerStyleEnd = {
  display: "flex",
  justifyContent: "flex-end",
  marginRight: "300px",
}

var inputStyleEnd = {
  backgroundColor: "grey",
  color: "white",
  border: "none",
  flex: "1",
  padding: "8px",
  maxWidth: "38%",
}

var buttonStyleEnd = {
  backgroundColor: "grey",
  color: "white",
  border: "none",
  marginLeft: "8px",
  padding: "8px",
}