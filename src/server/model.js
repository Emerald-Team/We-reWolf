import db from './db.js'
const mongoose = require('mongoose');

const model = {

  getChickens: async () => {
    return 'chickens'
  },
  getGameState: async (gameID) => {
    try {
      const gameState = await db.GameState.findOne({gameId: gameID})
      return gameState
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  createGame: async ({users, phase}) => {
    console.log('creating game...')
    try {
      const gameId = new mongoose.Types.ObjectId()
      const gameState = new db.GameState({
        gameId: gameId,
        users: users,
        phase: phase
      })
      await gameState.save()
      console.log(gameState, '------GAMESTATE IN MODEL-------')
      return gameState
    } catch (error) {
      console.error(error)
      throw error
      console.error('SERVER ERROR: ', error.response.data.error)
    }
  },

  getMessages: (gameID) => {
    return db.Message.find({ gameID: gameID })
  },
  postMessage: async (gameID, message) => {
    let newMessage = new db.Message({
      gameID: gameID,
      user: message.user,
      body: message.body,
      visibleTo: message.visibleTo
    })
    await newMessage.save()
    return db.Message.find({ gameID: gameID })
  },

  voteForUser: async(username, gameID) => {
    try {
      const gameState = await db.GameState.findOne({gameId: gameID})

      if (!gameState) {
        throw new Error('Game not found')
      }

      const user = gameState.users.find(user => user.username === username)
      if (!user) {
        throw new Error('User not found')
      }
      user.votes += 1

      await gameState.save()
      return gameState
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  toggleDead: async ({ userID }, gameID) => {

  },
  grantPermissions: async ({ userID, permissions }, gameID) => {

  },
  advanceGame: async (gameID) => {

  }
}

export default model