import db from './db.js'

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

  createGame: async ({, users, phase}) => {
    try {
      const gameId = new mongoose.Types.ObjectId()

      const gameState = new db.GameState({
        gameId: gameId,
        users: users,
        phase: phase
      })

      await gameState.save()
      return gameState
    } catch (error) {
      console.error(error)
      throw error
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
  voteForUser: async ({ userID, count }, gameID) => {

  },
  toggleDead: async ({ userID }, gameID) => {

  },
  grantPermissions: async ({ userID, permissions }, gameID) => {

  },
  advanceGame: async (gameID) => {

  }
}

export default model