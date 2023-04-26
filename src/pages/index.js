import Image from "next/image"
import { Inter } from "next/font/google"
import App from "./_app"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'


const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const router = useRouter()
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
 //console.log('in index file') // useEffect(() => {if (localStorage.getItem('user')) {router.push('/joinGameLobby')}}, [])

 useEffect(() => {
  if (localStorage.getItem("user")) {
    router.push("/joinGameLobby")
  }
}, [])

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");
  const [showing, setShowing] = useState(false);
  const [email, setEmail] = useState("");

  const loginHandler = async () => {
    let obj = { username: username, password: password, email: email };
    await axios
      .post("api/verifyUser", obj)
      .then((res) => {
        if (!window.localStorage.getItem('user')) {

         window.localStorage.setItem('user', username)
        };
        setEmail("");
        setUsername("");
        setPassword("");
        router.push('/joinGameLobby')
      })
      .catch((res) => { setEmail(''); setUsername(''); setPassword('');
       router.push("/");
      });
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h2 style={{ marginBottom: "10px" }}>Login</h2>
        <form style={styles.form}>
          <input type="text" placeholder="Username" style={styles.input} />
          <input type="password" placeholder="Password" style={styles.input} required/>
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
        <Link href='/signup' style={styles.text}>Sign-Up</Link>
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
  )
}
