import "@components/styles/globals.css"
import Header from "./header"
import {useState} from "react"

export default function App() {
  const [backGround, setBackGround] = useState('https://i.pinimg.com/originals/4a/ab/80/4aab809d495f78f66a0b8966455a29b1.jpg')
  const [buttonName, setButtonName] = useState("Castle")
  let changeTheme = () => {
    if (backGround === 'https://i.pinimg.com/originals/4a/ab/80/4aab809d495f78f66a0b8966455a29b1.jpg') {
    setBackGround('https://149359637.v2.pressablecdn.com/wp-content/uploads/2021/10/Dark-Castle-Wallpaper-About-Murals.jpg')
    setButtonName("Forest")
  } else {
    setBackGround('https://i.pinimg.com/originals/4a/ab/80/4aab809d495f78f66a0b8966455a29b1.jpg')
    setButtonName("Castle")
  }
  }
  return (
    <div style={{ backgroundImage: `url(${backGround})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} className="flex flex-col h-screen">
    <Header changeTheme={changeTheme} buttonName={buttonName}/>
    </div>
  )
}
