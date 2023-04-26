import Image from "next/image"

export default function End() {
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

  var imageContainerStyle = {
    marginLeft: "auto",
    marginRight: "auto",
  }

  var imageStyle = {
    textAlign: "center",
    marginTop: "16px",
    color: "white",
    fontSize: "36px",
    fontWeight: "bold",
  }

  var chatContainerStyle = {
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

  var chatContentContainerStyle = {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  }

  var inputContainerStyle = {
    display: "flex",
    justifyContent: "flex-end",
    marginRight: "300px",
  }

  var inputStyle = {
    backgroundColor: "grey",
    color: "white",
    border: "none",
    flex: "1",
    padding: "8px",
    maxWidth: "38%",
  }

  var buttonStyle = {
    backgroundColor: "grey",
    color: "white",
    border: "none",
    marginLeft: "8px",
    padding: "8px",
  }

  var insideChat = [
    { username: "User1", text: "HAHA EASY GAME" },
    { username: "User2", text: "wolfs were brain dead" },
    { username: "User1", text: "HAHA EASY GAME" },
    { username: "User2", text: "wolfs were brain dead" },
    { username: "User1", text: "HAHA EASY GAME" },
    { username: "User2", text: "wolfs were brain dead" },
    { username: "User1", text: "HAHA EASY GAME" },
    { username: "User2", text: "wolfs were brain dead" },
    { username: "User1", text: "HAHA EASY GAME" },
    { username: "User2", text: "wolfs were brain dead" },
    { username: "User1", text: "HAHA EASY GAME" },
    { username: "User2", text: "wolfs were brain dead" },
    { username: "User1", text: "HAHA EASY GAME" },
    { username: "User2", text: "wolfs were brain dead" },
    { username: "User1", text: "HAHA EASY GAME" },
    { username: "User2", text: "wolfs were brain dead" },
    { username: "User1", text: "HAHA EASY GAME" },
    { username: "User2", text: "wolfs were brain dead" },
    { username: "User1", text: "HAHA EASY GAME" },
    { username: "User2", text: "wolfs were brain dead" },
    { username: "User1", text: "HAHA EASY GAME" },
    { username: "User2", text: "wolfs were brain dead" },
    { username: "User1", text: "HAHA EASY GAME" },
    { username: "User2", text: "wolfs were brain dead" },
    { username: "User1", text: "HAHA EASY GAME" },
    { username: "User2", text: "wolfs were brain dead" },
  ]
  return (
    <>
      <div style={containerStyle}>
        <div style={imageContainerStyle}>
          <Image src="/giphy.gif" alt="Your Image" width="400" height="600" />
          <p style={imageStyle}>Villagers WIN!</p>
        </div>
        <div style={chatContainerStyle}>
          <div style={chatContentContainerStyle}>
            {insideChat.map((chat) => {
              return (
                <p key={chat.username} style={textStyle}>
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
