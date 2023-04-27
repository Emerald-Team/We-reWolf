import React, { useState, useEffect } from "react"
import { useRouter, redirect } from "next/router"

import axios from "axios"

export default function SignUp() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const [species, setSpecies] = useState("")
  const [id, setId] = useState({})
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      router.push("/joinGameLobby")
    }
  }, [])

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh",
    },
    loginBox: {
      width: "400px",
      padding: "24px",
      backgroundColor: "rgba(255, 255, 255, 0.6)",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      borderRadius: "4px",
      textAlign: "center",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "24px",
    },
    input: {
      width: "100%",
      padding: "8px 16px",
      marginBottom: "16px",
      borderRadius: "4px",
      border: "1px solid #ccc",
    },
    inputLast: {
      width: "100%",
      padding: "8px 16px",
      marginBottom: "7px",
      borderRadius: "4px",
      border: "1px solid #ccc",
    },
    button: {
      width: "100%",
      padding: "12px 24px",

      backgroundColor: "#2A303C",
      color: "white",
      borderRadius: "4px",
      border: "none",
      cursor: "pointer",
    },
    selectStyle: {
      marginBottom: "20px",
    },
  }
  const signupHandler = async () => {
    console.log(username, password, email, "Login Info");

    let obj = {
      username: username,
      password: password,
      email: email,
      species: species,
    }
    await axios

      .post("api/createUser", obj)
      .then((res) => {
        console.log("response data :", res.data)
        localStorage.setItem("user", obj.username)
        setEmail("")
        setUsername("")
        setPassword("")
        setSpecies("")
        router.push("/joinGameLobby")
      })
      .catch((res) => {
        //setMessage(res.data);
        router.push("/signup")
      })

    //router.push("/lobby");
  }

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h2 style={{ marginBottom: "10px" }}>Sign Up</h2>
        <form style={styles.form}>
          <input
            type="email"
            value={email}
            placeholder="Email"
            style={styles.input}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            required />
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            placeholder="Password"
            style={styles.input}
            required />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
            }}
            style={styles.input}
            required />

          <label for="species">Choose a Species:</label>
          <select
            style={styles.selectStyle}
            name="species"
            id="species"
            form="speciesform"
            onChange={(e) => {
              setSpecies(e.target.value)
            }}
            required>
            <option value="Human">Human</option>
            <option value="Werewolf">Werewolf</option>
          </select>
          {/* <input type="text" placeholder="w.e. you want" style={styles.input} />
          <input type="text" placeholder="w.e. you want" style={styles.input} />
          <input type="text" placeholder="w.e. you want" style={styles.input} /> */}
          <button
            className="signButton"
            type="submit"
            style={styles.button}
            onClick={(e) => {
              e.preventDefault()
              signupHandler()
            }}
          >
            Sign-Up
          </button>
        </form>
      </div>
    </div>
  )
}
