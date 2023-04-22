import React from "react"
import Image from "next/image"

const Header = ({ changeTheme, buttonName }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
        backgroundColor: "#2A303C",
      }}
    >
      <div style={{ height: "3rem", width: "auto" }}>
        <Image
          src="/Screenshot_2023-04-21_at_10.24.04_PM-removebg-preview.png"
          alt="Title"
          layout="responsive"
          width={150}
          height={60}
        />
      </div>
      <button
        style={{
          backgroundColor: "gray",
          hover: "gray",
          color: "white",
          padding: "0.5rem 1rem",
          borderRadius: "0.25rem",
        }}
        onClick={changeTheme}
      >
        {buttonName}
      </button>
    </div>
  )
}

export default Header
