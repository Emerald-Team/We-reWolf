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

export const gameSlice = createSlice({
  name: 'gameState',
  initialState: initialState,
  reducers: {
    // increment: state => {
    //   state.value += 1
    // },
    // decrement: state => {
    //   state.value -= 1
    // },
    addUser: (state, action) => {
      state.users[action.payload.username] = action.payload
    },
    setRole: (state, action) => {
      state.users[action.payload.username].role = action.payload.role
    },
    killUser: (state, action) => {
      const user = state.users[action.payload]
      user.alive = false,
      user.markedForDeath = false
    },
    markForDeath(state, action) => {
      state.users[action.payload.username].markedForDeath = action.payload.bool
     },

    setTimeOfDay: (state, action) => {
      state.timeOfDay = action.payload
    }
  }
})