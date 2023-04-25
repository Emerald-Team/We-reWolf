import { useMemo, useEffect, useState } from "react";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
import Image from "next/image";
import Avatar from "/src/comps/avatar.js"
import axios from 'axios'

const interval = 10;
const phases = ['night', 'day'];
const exampleGameData = {
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
      isAlive: true,
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
};

export default function Game() {

<<<<<<< HEAD
  // const username = "TheBigBadBill"
  // const gameID = "1234"
=======
  const username = "Remus"
  const gameID = "1234"
>>>>>>> 741227e (idk)

  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [timeLeft, setTimeLeft] = useState(interval);
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [phase, setPhase] = useState(phases[phaseIndex])
  const [players, setPlayers] = useState(exampleGameData.users)
  const [player, setPlayer] = useState(exampleGameData.users.filter(user => user.username === exampleGameData.username)[0])
  const [isWerewolf, setIsWerewolf] = useState(player.role === 'werewolf')
  const [selected, setSelected] = useState(null);

  const handleEndPhase = function(phaseEnded) {
    console.log('handling phase end, ', phaseEnded)
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

    // }
  }
  useEffect(() => {
    setPlayers(players.map(player => {
      if (player === selected) {
        player.votes++
        return player
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
    console.log('phase', phase)
    handleEndPhase(phases[(phaseIndex - 1) % phases.length])
  }, [phase])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timeLeft < 1) {
        setTimeLeft(interval); // set initial time left to 10 seconds
        setPhaseIndex((phaseIndex + 1) % phases.length)
        console.log('phase index', phaseIndex)
      } else {
        console.log(timeLeft)
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const getMessages = () => {
    const options = {
      method: "GET",
      url: `api/messages/${exampleGameData.gameID}`
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
      user: exampleGameData.username,
      body: text,
      visibleTo: {
        all: true
      }
    }
    const options = {
      method: 'POST',
      url: `api/messages/${exampleGameData.gameID}`,
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
              <p>{player.role}</p>
            </div>
            <div style={phase === 'night' ? timerStyleNight : timerStyle}>
              <p>{timeLeft}</p>
            </div>
            <div style={dayStyleNight}>
              <p>{phase}</p>
              {/* Day*/}
            </div>
          </div>
          <div className="players" style={phase === 'night' ? playerContainerNight : playerContainer}>
            {players.map((player, i) => <Avatar key={i} player={player} selected={selected} setSelected={setSelected} />)}
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
