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

const tombstoneUrl = '/tombstone.png';

const Avatar = ({ player, thisPlayerCanSelect, selected, setSelected, setLastSelected, gameID }) => {
  const [style, setStyle] = useState(playerStyle);
  const [votes, setVotes] = useState(player.votes);
  const [canHover, setCanHover] = useState(player.isAlive);
  const [canSelect, setCanSelect] = useState(player.isAlive && thisPlayerCanSelect);
  const [isSelected, setIsSelected] = useState(player === selected);
  const [isSelectedLagFrame, setIsSelectedLagFrame] = useState(player === selected);

  const avatar = useMemo(() => {
    return createAvatar(lorelei, {
      size: 100,
      seed: player.username,
    }).toDataUriSync();
  }, []);

  // vote to kill
  async function voteForUser(username, previousUsername, gameID ) {
    const response = await fetch(`/api/voteToKill/${gameID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username,previousUsername, gameID})
    })
    if (!response.ok) {
      console.error(`Error: ${response.statusText}`)
    }
    const updatedGameState = await response.json()
    console.log(updatedGameState, '--------UPDATED GAME STATE-------')
    return updatedGameState
  }
  // unvote to kill
  async function unvoteForUser(username, previousUsername, gameID ) {
    const response = await fetch(`/api/unvoteToKill/${gameID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username,previousUsername, gameID})
    })
    if (!response.ok) {
      console.error(`Error: ${response.statusText}`)
    }
    const updatedGameState = await response.json()
    console.log(updatedGameState, '--------UNUPDATED GAME STATE-------')
    return updatedGameState
  }

  // if player is dead, render dead style [TODO: bugged]
  useEffect(() => {
    setVotes(player.votes);
    if (!player.isAlive || !thisPlayerCanSelect) {
      setCanHover(false);
      setCanSelect(false);
    }
  }, [player, canSelect]);

  // if player is not currently selected, set style to unselected
  useEffect(() => {
    if (selected !== player) {
      setStyle(playerStyle)
      // unvoteForUser(player.username, null, gameID)
      setIsSelectedLagFrame(player)
    }
  }, [isSelected]);

  // when selected or player change, set state to whether this is the current selection
  useEffect(() => {
    setIsSelected(selected === player);
  }, [selected, player])

  // if player is alive and not currently selected, highlight on hover
  const handleHoverIn = function(e) {
    if (!isSelected && canHover) {
      setStyle(playerStyleHover)
    }
  }
  const handleHoverOut = function(e) {
    if (!isSelected && canHover) {
      setStyle(playerStyle)
    }
  }

  // if current selection:
  //   set style to normal style,
  //   set selected to null
  const select = async function() {
    setStyle(playerStyleHover)
    const newLastSelected = selected;
    setSelected(player)
    setLastSelected(selected)
    await voteForUser(player.username, newLastSelected ? newLastSelected.username : null, gameID)
  }

  // if not the current selection:
  //   set style to hover style,
  //   set selected and last selected to player
  const unselect = async function() {
    setStyle(playerStyle)
    setSelected(null)
  }
  // if selected: unselect
  // else: select
  const handleSelect = function(e) {
    if(!canSelect) {
      return;
    }
    if (isSelected) {
      unselect();
    } else {
      select();
    }
  }

  return (
    <div style={style} onMouseOver={handleHoverIn} onMouseLeave={handleHoverOut} onClick={handleSelect}>
      <div style={{position: 'relative'}} ><div style={voteStyle}>{(votes)}</div></div>
        {player.isAlive ?
          <Image src={avatar} alt="Avatar" width="100" height="100" /> :
          <Image className="dead" src='/2869384.png' alt="tombstone" width="100" height="100" />}
      <small>{player.username}</small>
    </div>
  )
}

export default Avatar
