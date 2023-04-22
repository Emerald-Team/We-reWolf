import React from "react"
import Image from "next/image"
import Link from "next/link"

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
      <div style={{ height: "4.5rem", marginTop: "-0.5rem" }}>
        <Link href="/">
          <Image src="/white.png" alt="Title" width={250} height={70} />
        </Link>
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
