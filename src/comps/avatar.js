import React from "react"
import { useState, useEffect, useMemo } from "react"
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
import Image from "next/image";

var playerStyle = {
  textAlign: "center",
}
var playerStyleDead = {
  textAlign: "center",
  transform: "rotate(180deg)"
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
var voteStyle = {
  position: 'relative',
  top: '5px',
  left: '5px',
  textAlign: "center",
  color: "white",
}

const Avatar = ({ player, selected, setSelected }) => {
  const [style, setStyle] = useState(playerStyle);
  const [votes, setVotes] = useState(player.votes);
  const avatar = useMemo(() => {
    return createAvatar(lorelei, {
      size: 100,
      seed: player.username,
    }).toDataUriSync();
  }, []);
  useEffect(() => {
    if (!player.isAlive) {
      setStyle(playerStyleDead);
    }
  }, [player])
  useEffect(() => {
    if (selected !== player) {
      setStyle(playerStyle)
    }
  }, [selected])

  const handleHoverIn = function(e) {
    if (selected !== player && !player.isAlive) {
      setStyle(playerStyleHover)
    }
  }
  const handleHoverOut = function(e) {
    if (selected !== player && !player.isAlive) {
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
      <div style={voteStyle}>{votes}</div>
      <Image src={avatar} alt="Avatar" width="100" height="100" />
      <small>{player.username}</small>
    </div>
  )
}

export default Avatar
