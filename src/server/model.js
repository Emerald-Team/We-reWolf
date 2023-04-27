import db from './db.js'
const userDatabase = require('./userdatabase.js')
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
  createGame: async ({gameId, users, phase}) => {
    console.log('creating game...')
    try {
      const gameState = new db.GameState({
        gameId: gameId,
        users: users,
        phase: phase
      })
      await gameState.save()
      // console.log(gameState, '------GAMESTATE IN MODEL-------')
      return gameState
    } catch (error) {
      console.error(error)
      throw error
      console.error('SERVER ERROR: ', error.response.data.error)
    }
  },
  createLobby: async (gameID, user) => {
    const userFile = await userDatabase.Users.find({username: user})[0]
    let newLobby = new db.Lobby({
      username: userFile.username,
      role: "in lobby"
    })
    return newLobby.save()
  },
  updateLobby: async (gameID, user) => {
    const lobbyOccupants = await db.Lobby.find({
      gameID: gameID
    })[0][users]
    const userFile = await userDatabase.Users.find({username: user})[0]
    lobbyOccupants.push({
      username: userfile.username,
      rank: 1,
      role: "in lobby"
    })
    return db.Lobby.findOneAndUpdate({ gameID: gameID }, { users: lobbyOccupants }, { new: true })
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

  voteForUser: async(username, previousUsername, gameID) => {
    console.log(gameID)
    try {
      const gameState = await db.GameState.findOne({gameId: gameID})

      if (!gameState) {
        throw new Error('Game not found')
      }

      if (previousUsername) {
        const previousUser = gameState.users.find(user => user.username === previousUsername)
        if (previousUser) {
          console.log('Previous user found:', previousUser)
          previousUser.votes -= 1
        } else {
          console.log('Previous user not found:', previousUsername)
        }
      }

      const user = gameState.users.find(user => user.username === username)
      if (!user) {
        console.log('User not found:', username)
        throw new Error('User not found')
      }
      user.votes += 1
      console.log('User votes updated:', user)
      await gameState.save()
      return gameState
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  resetVotes: async (gameID) => {
    try {
      const gameState = await db.GameState.findOne({ gameId: gameID });
      console.log('Game state before resetting votes:', gameState);

      if (!gameState) {
        throw new Error('Game not found');
      }

      gameState.users.forEach((user) => {
        console.log('User before resetting votes:', user);
        user.votes = 0;
        console.log('User after resetting votes:', user);
      });

      await gameState.save();
      console.log('Game state after resetting votes:', gameState);
      return gameState;
    } catch (error) {
      console.error(error);
      throw error;
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