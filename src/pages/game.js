import Image from "next/image"

export default function Game() {
  var textStyle = {
    color: "white",
    textAlign: "left",
    fontSize: "24px",
  }

  var containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }

  var gameContainerStyle = {
    backgroundColor: "rgba(256, 256, 256, 0.7)",
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

  var chatContainerStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    width: "35%",
    height: "70vh",
    marginLeft: "auto",
    marginRight: "300px",
    marginBottom: "20px",
    marginTop: "40px",
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
    marginRight: "300px",
  }

  var inputStyle = {
    backgroundColor: "grey",
    color: "white",
    border: "none",
    flex: "1",
    padding: "8px",
    maxWidth: "30%",
  }

  var buttonStyle = {
    backgroundColor: "grey",
    color: "white",
    border: "none",
    marginLeft: "8px",
    padding: "8px",
  }

  var insideChat = [{ username: "User1", text: "HAHA EASY GAME" }]
  return (
    <>
      <div style={containerStyle}>
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
        </div>
        <div style={chatContainerStyle}>
          <div style={chatContentContainerStyle}>
            {insideChat.map((chat) => {
              return (
                <p style={textStyle}>
                  {chat.username}: {chat.text}
                </p>
              )
            })}
          </div>
        </div>
      </div>
      <div style={inputContainerStyle}>
        <input
          type="text"
          style={inputStyle}
          placeholder="Type your message here..."
        />
        <button style={buttonStyle}>Send</button>
      </div>
    </>
  )
}
