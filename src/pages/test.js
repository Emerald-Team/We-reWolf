import { useMemo } from "react"
import { createAvatar } from "@dicebear/core"
import { lorelei } from "@dicebear/collection"
import Image from "next/image"

export default function Test() {
  var gameContainerStyle = {
    backgroundColor: "rgba(256, 256, 256, 0.7)", // CHANGE COLOR HERE THROUGH STATE
    width: "45%",
    height: "70vh",
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

  var boxContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "10px",
  }

  var roleStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    height: "100px",
    margin: "0 5px",
    display: "flex",
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

  var dayStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    height: "100px",
    margin: "0 5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: "0.2",
  }

  var playerContainer = {
    display: "grid",
    marginTop: "30px",
    gridTemplateColumns: "repeat(4, 1fr)", //
    gap: "10px",
  }

  var player = {
    textAlign: "center",
  }

  var werewolfTextContainer = {
    position: "absolute",
    bottom: "10px",
    right: "10px",
    textAlign: "right",
  }

  //Logic
  const avatar = useMemo(() => {
    return createAvatar(lorelei, {
      size: 128,
      seed: "John",
    }).toDataUriSync()
  }, [])

  const avatar1 = useMemo(() => {
    return createAvatar(lorelei, {
      size: 128,
      seed: "Amy",
    }).toDataUriSync()
  }, [])

  return (
    <div style={gameContainerStyle}>
      <div style={boxContainerStyle}>
        <div style={roleStyle}>
          <p>Werewolf</p>
        </div>
        <div style={timerStyle}>
          <p>1:58</p>
        </div>
        <div style={dayStyle}>
          <p>Day 🔆/Night 🌙</p>
        </div>
      </div>
      <div className="players" style={playerContainer}>
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
      </div>
      <div style={werewolfTextContainer}>Werewolves: user1, user2</div>
    </div>
  )
}
