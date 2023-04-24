import React from "react"
import { useState } from "react"

const Counter = ({ count, setCount, buttonDisabled }) => {
  function adjustCount(amount) {
    setCount((currentCount) => {
      return currentCount + amount
    })
  }

  const buttonStyle = {
    backgroundColor: "#808080",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "14px",
    margin: "0 4px",
  }

  const buttonHoverStyle = {
    backgroundColor: "#a9a9a9",
  }

  const buttonActiveStyle = {
    backgroundColor: "#6c757d",
  }

  return (
    <>
      {count > 0 && (
        <button
          style={buttonStyle}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = buttonHoverStyle.backgroundColor
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = buttonStyle.backgroundColor
          }}
          onMouseDown={(e) => {
            e.target.style.backgroundColor = buttonActiveStyle.backgroundColor
          }}
          onMouseUp={(e) => {
            e.target.style.backgroundColor = buttonStyle.backgroundColor
          }}
          onClick={() => adjustCount(-1)}
          disabled = {buttonDisabled}
        >
          -
        </button>
      )}
      <span>{count}</span>
      <button
        style={buttonStyle}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = buttonHoverStyle.backgroundColor
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = buttonStyle.backgroundColor
        }}
        onMouseDown={(e) => {
          e.target.style.backgroundColor = buttonActiveStyle.backgroundColor
        }}
        onMouseUp={(e) => {
          e.target.style.backgroundColor = buttonStyle.backgroundColor
        }}
        onClick={() => adjustCount(1)}
        disabled = {buttonDisabled}
      >
        +
      </button>
    </>
  )
}

export default Counter
