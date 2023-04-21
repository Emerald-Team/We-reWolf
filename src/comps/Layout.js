import Header from "./header"
import {useState} from "react"

export default function Layout({children}) {
  const [backGround, setBackGround] = useState('https://wallpaperaccess.com/full/8686093.jpg')
  const [buttonName, setButtonName] = useState("Castle")
  let changeTheme = () => {
    if (backGround === 'https://wallpaperaccess.com/full/8686093.jpg') {
    setBackGround('https://149359637.v2.pressablecdn.com/wp-content/uploads/2021/10/Dark-Castle-Wallpaper-About-Murals.jpg')
    setButtonName("Forest")
  } else {
    setBackGround('https://wallpaperaccess.com/full/8686093.jpg')
    setButtonName("Castle")
  }
  }
  return (
    <div style={{ backgroundImage: `url(${backGround})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} className="flex flex-col h-screen">
    <Header changeTheme={changeTheme} buttonName={buttonName}/>
    {children}
    </div>
  )
}