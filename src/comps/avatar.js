import React from "react"
import { useState, useEffect, useMemo } from "react"
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
import Image from "next/image";

var playerStyle = {
  textAlign: "center",
}
var playerStyleHover = {
  textAlign: "center",
  background: 'radial-gradient(#e66465, #9198e5)',
  borderRadius: '50%',
  color: "white",
}
var playerStyleNight = {
  textAlign: "center",
  color: "white",
}

const Avatar = ({ player, selected, setSelected }) => {
  const [style, setStyle] = useState(playerStyle)
  const avatar = useMemo(() => {
    return createAvatar(lorelei, {
      size: 100,
      seed: player.username,
    }).toDataUriSync();
  }, []);

  useEffect(() => {
    if (selected !== player) {
      setStyle(playerStyle)
    }
  }, [selected])

  const handleHoverIn = function(e) {
    if (selected !== player) {
      setStyle(playerStyleHover)
    }
  }
  const handleHoverOut = function(e) {
    if (selected !== player) {
      setStyle(playerStyle)
    }
  }
  const handleSelect = function(e) {
    if (selected !== player) {
      setStyle(playerStyleHover)
      setSelected(player)
    } else {
      setStyle(playerStyle)
      setSelected(null)
    }
  }

  return (
    <div style={style} onMouseOver={handleHoverIn} onMouseLeave={handleHoverOut} onClick={handleSelect}>
      <Image src={avatar} alt="Avatar" width="100" height="100" />
      <small>{player.username}</small>
    </div>
  )
}

export default Avatar
