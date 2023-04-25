import Image from "next/image";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import App from "./_app";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
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
    button: {
      width: "100%",
      padding: "12px 24px",
      backgroundColor: "#2A303C",
      color: "white",
      borderRadius: "4px",
      border: "none",
      cursor: "pointer",
    },
    text: {
      marginBottom: "16px",
    },
    imageBox: {
      marginLeft: "24px",
    },
    image: {
      width: "200px",
      height: "200px",
      objectFit: "cover",
      borderRadius: "4px",
    },
  };

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");
  const [showing, setShowing] = useState(false);
  const [email, setEmail] = useState("");

  const loginHandler = async () => {
    let obj = { username: username, password: password, email: email };
    await axios
      .post("api/verifyUser", obj)
      .then((res) => {
        window.localStorage.setItem('user', obj.username)
        setEmail("");
        setUsername("");
        setPassword("");
        router.push('/lobby')
      })
      .catch((res) => { console.log('fjksdla;fksa;')
       router.push("/login");
      });
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h2 style={{ marginBottom: "10px" }}>Login</h2>
        <form style={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            style={styles.input}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            style={styles.input}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <input
            type="text"
            placeholder="E-mail"
            value={email}
            style={{ visibility: `${showing ? "visible" : "hidden"}` }}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <button
            className="loginButton"
            type="submit"
            style={styles.button}
            onClick={(e) => {
              e.preventDefault();
              loginHandler();
            }}
          >
            Login

          </button>
        </form>
        <a
          onClick={(e) => {
            e.preventDefault();
            setShowing(!showing);
          }}
        >
          Click here to sign in with an email address
        </a>
      </div>
      <div style={styles.imageBox}>
        <Image
          src="/wold2.gif"
          alt="Login"
          style={styles.image}
          width={150}
          height={60}
        />
      </div>
    </div>
  );
}
