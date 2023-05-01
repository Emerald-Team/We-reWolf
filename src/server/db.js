const mongoose = require('mongoose');

const uri = 'MONGO_DB_ATLAS_STRING';

mongoose.connect(uri)

const database = mongoose.connection;

database.on('error', (error) => {
  console.error('Error connecting to MongoDB Atlas Database: ', error)
})

database.once('open', () => {
  console.log('Connected to MongoDB Atlas Database! ')
})

const messageSchema = new mongoose.Schema({
  gameID: String,
  user: String,
  body: String,
  sentAt: { type: Date, default: Date.now },
  visibleTo: String
})

const gameStateSchema = new mongoose.Schema({
  gameID: {
    type: String,
  },
  users: [{
    username: String,
    role: String,
    permissions: [String],
    isAlive: {
      type: Boolean,
      default: true
    },
    votes: {
      type: Number,
      default: 0
    }
  }],
  phase: {
    type: String,
    enum: ['night', 'day']
  }
})

const lobbySchema = new mongoose.Schema({
  gameID: String,
  users: [{
    username: String,
    rank: {type: Number, default: 1},
    role: {type: String, default: 'default'}
  }],
  hasStarted: { type: Boolean, default: false }
})

const db = {
  Message: mongoose.models.Message || mongoose.model('Message', messageSchema),
  GameState: mongoose.models.GameState || mongoose.model('GameState', gameStateSchema),
  Lobby: mongoose.models.Lobby || mongoose.model('Lobby', lobbySchema)
}

module.exports = db
