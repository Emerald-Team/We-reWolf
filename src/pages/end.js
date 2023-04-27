import Image from "next/image"

export default function End() {
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
  const tomb = "/2869384.png"
  return (
    <>
      <div style={containerStyleEnd}>
        <div style={imageContainerStyleEnd}>
          <Image src="/giphy.gif" alt="Your Image" width="400" height="600" />
          <p style={imageStyleEnd}>Villagers WIN!</p>
        </div>
        <div style={chatContainerStyleEnd}>
          <div style={chatContentContainerStyleEnd}>
            {insideChat.map((chat) => {
              return (
                <p key={chat.username} style={textStyleEnd}>
                  {chat.username}: {chat.text}
                </p>
              )
            })}
          </div>
        </div>
      </div>
      <div style={inputContainerStyleEnd}>
        <input
          type="text"
          style={inputStyleEnd}
          placeholder="Type your message here..."
        />
        <button style={buttonStyleEnd}>Send</button>
      </div>
    </>
  )
}
