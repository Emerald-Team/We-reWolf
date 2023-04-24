import db from './db.js'

const model = {

  getChickens: async () => {
    return 'chickens'
  },
  getGameState: async (gameID) => {

  },
  updateGame: async (gameID, gameState) => {

  },
  getMessages: (gameID) => {
    console.log(gameID, 'gameID')
    console.log(db.Message, 'db.Message')
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