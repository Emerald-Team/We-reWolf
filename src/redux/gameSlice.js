import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  {
    "users": {
     "username": {
        "user": {},
        "role" : "unassigned", // ["villager", "werewolf", "seer", "doctor"]
        "alive": true,
        "markedForDeath": false,
        "votesToKill": 0,
        "chatPermissions": ["villager"] // [ "villager", "dead", "wolf" ]
      }
    },
    "timeOfDay": "night", //day/night
    "werewolves": [],
    "villagers": [],
    "doctors": [],
    "seers": [],
    "lobbyId": 1
  }
}