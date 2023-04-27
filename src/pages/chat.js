import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Chat({ gameID, username }) {


  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')

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

  const handleSend = () => {
    const payload = {
      user: username,
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

  const handleText = (e) => {
    setText(e.target.value)
  }

  // useEffect(() => {
  //   getMessages();

  // }, [])

  return (
    <div>
      <div onClick={getMessages}>Chat</div>
      {messages.map(message => (
        <div key={message._id}>{message.body}</div>
      ))}
      <div>
        <input
          type="text"
          onChange={handleText}
          value={text}
          placeholder="Type your message here..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}