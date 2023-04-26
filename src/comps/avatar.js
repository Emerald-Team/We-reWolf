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
  border: 'solid',
  borderColor: 'red',
  backgroundColor: 'red',
  borderRadius: '50%',
  position: 'absolute',
  top: '5px',
  right: '5px',
  textAlign: "center",
  color: "white",
}

const Avatar = ({ player, selected, setSelected, setLastSelected }) => {
  const [style, setStyle] = useState(playerStyle);
  const [votes, setVotes] = useState(player.votes);
  const [isSelected, setIsSelected] = useState(player === selected);
  const avatar = useMemo(() => {
    return createAvatar(lorelei, {
      size: 100,
      seed: player.username,
    }).toDataUriSync();
  }, []);

  // if player is dead, render dead style
  useEffect(() => {
    if (!player.isAlive) {
      setStyle(playerStyleDead);
    }
  }, [player]);

  // if player is not currently selected, set style to unselected
  useEffect(() => {
    if (selected !== player) {
      setStyle(playerStyle)
    }
  }, [selected]);

  // when selected or player change, set state to whether this is the current selection
  useEffect(() => {
    setIsSelected(selected === player);
  }, [selected, player])

  // if player is alive and not currently selected, highlight on hover
  const handleHoverIn = function(e) {
    if (!isSelected && player.isAlive) {
      setStyle(playerStyleHover)
    }
  }
  const handleHoverOut = function(e) {
    if (!isSelected && player.isAlive) {
      setStyle(playerStyle)
    }
  }

  // if not the current selection:
  //   set style to hover style,
  //   set selected and last selected to player
  // if current selection:
  //   set style to normal style,
  //   set selected to null
  const handleSelect = function(e) {
    if (!isSelected) {
      setStyle(playerStyleHover)
      setSelected(player)
      setLastSelected(player)
    } else {
      setStyle(playerStyle)
      setSelected(null)
    }
  }
  return (
    <div style={style} onMouseOver={handleHoverIn} onMouseLeave={handleHoverOut} onClick={handleSelect}>
      <div style={{position: 'relative'}} >{votes ? (<div style={voteStyle}>{votes + (isSelected ? 1 : 0)}</div>) : '' }</div>
      <Image src={avatar} alt="Avatar" width="100" height="100" />
      <small>{player.username}</small>
    </div>
  )
}

export default Avatar
