import mongoose from 'mongoose';

const uri = 'mongodb+srv://werewolf:awooo@testcluster.j05r1cq.mongodb.net/?retryWrites=true&w=majority';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect(uri, options);

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
  visibleTo: {
    all: Boolean,
    werewolves: Boolean,
    direct: String
  }
})

const gameStateSchema = new mongoose.Schema({
  gameId: String,
  users: [{
    username: String,
    role: String,
    isAlive: Boolean,
    votes: Number
  }],
  phase: {
    type: String,
    enum: ['night', 'day']
  }
})

const db = {
  Message: mongoose.models.Message || mongoose.model('Message', messageSchema),
  GameState: mongoose.models.GameState || mongoose.model('GameState', gameStateSchema)
}

export default db