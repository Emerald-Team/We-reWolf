import Header from "./header"
import { useState } from "react"

const Layout = ({ children }) => {
  const [backGround, setBackGround] = useState(
    "https://wallpaperaccess.com/full/8686093.jpg"
  )
  const [buttonName, setButtonName] = useState("Castle")

  const changeTheme = () => {
    if (backGround === "https://wallpaperaccess.com/full/8686093.jpg") {
      setBackGround(
        "https://149359637.v2.pressablecdn.com/wp-content/uploads/2021/10/Dark-Castle-Wallpaper-About-Murals.jpg"
      )
      setButtonName("Forest")
    } else {
      setBackGround("https://wallpaperaccess.com/full/8686093.jpg")
      setButtonName("Castle")
    }
  }

  return (
    <div
      style={{
        backgroundImage: `url(${backGround})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header changeTheme={changeTheme} buttonName={buttonName} />
      {children}
    </div>
  )
}

export default Layout
