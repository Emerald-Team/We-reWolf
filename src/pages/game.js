import { useMemo } from "react"
import { createAvatar } from "@dicebear/core"
import { lorelei } from "@dicebear/collection"
import Image from "next/image"
import Chat from './chat.js'

export default function Game() {
  var insideChat = [{ username: "User1", text: "HAHA EASY GAME" }]

  const avatar = useMemo(() => {
    return createAvatar(lorelei, {
      size: 100,
      seed: "John",
    }).toDataUriSync()
  }, [])

  const avatar1 = useMemo(() => {
    return createAvatar(lorelei, {
      size: 100,
      seed: "Amy",
    }).toDataUriSync()
  }, [])

  return (
    <>
      <div style={containerStyle}>
        <div style={gameContainerStyleNight}>
          <div style={boxContainerStyle}>
            <div style={roleStyleNight}>
              <p>Werewolf</p>
            </div>
            <div style={timerStyleNight}>
              <p>1:58</p>
            </div>
            <div style={dayStyleNight}>
              <p>Night 🌙</p>
              {/* Day 🔆 */}
            </div>
          </div>
          <div className="players" style={playerContainerNight}>
            <div style={player}>
              <Image src={avatar} alt="Avatar" width="100" height="100" />
              <small>user1</small>
            </div>
            <div style={player}>
              <Image src={avatar1} alt="Avatar" width="100" height="100" />
              <small>user2</small>
            </div>
            <div style={player}>
              <Image src={avatar} alt="Avatar" width="100" height="100" />
              <small>user1</small>
            </div>
            <div style={player}>
              <Image src={avatar1} alt="Avatar" width="100" height="100" />
              <small>user2 Vote:2</small>
            </div>
            <div style={player}>
              <Image src={avatar} alt="Avatar" width="100" height="100" />
              <small>user1</small>
            </div>
            <div style={player}>
              <Image src={avatar1} alt="Avatar" width="100" height="100" />
              <small>user2</small>
            </div>
            <div style={player}>
              <Image src={avatar} alt="Avatar" width="100" height="100" />
              <small>user1</small>
            </div>
            <div style={player}>
              <Image src={avatar1} alt="Avatar" width="100" height="100" />
              <small>user2</small>
            </div>
            <div style={player}>
              <Image src={avatar} alt="Avatar" width="100" height="100" />
              <small>user1</small>
            </div>
            <div style={player}>
              <Image src={avatar1} alt="Avatar" width="100" height="100" />
              <small>user2</small>
            </div>
            <div style={player}>
              <Image src={avatar1} alt="Avatar" width="100" height="100" />
              <small>user2</small>
            </div>
          </div>
          <small style={werewolfTextContainerNight}>
            Werewolves: user1, user2
          </small>
        </div>
        {/* hardcoded for testing, will work properly with proper props */}
        <Chat username={'someGuyWithATuba'} gameID={'1234'}/>
        {/* <div style={chatContainerStyle}>
          <div style={chatContentContainerStyle}>
            {insideChat.map((chat) => {
              return (
                <p style={textStyle}>
                  {chat.username}: {chat.text}
                </p>
              )
            })}
          </div>
        </div> */}
      </div>
      {/* <div style={inputContainerStyle}>
        <input
          type="text"
          style={inputStyle}
          placeholder="Type your message here..."
        />
        <button style={buttonStyle}>Send</button>
      </div> */}
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
  height: "70vh",
  minWidth: "45%",
  marginLeft: "200px",
  marginRight: "100px",
  marginBottom: "20px",
  marginTop: "40px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  position: "relative",
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
  marginTop: "20px",
  gridTemplateColumns: "repeat(5, auto)",
}

var playerContainerNight = {
  display: "grid",
  marginTop: "30px",
  gridTemplateColumns: "repeat(5, auto)",
  gap: "20px",
  color: "white",
}

var player = {
  textAlign: "center",
}

var playerNight = {
  textAlign: "center",
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
