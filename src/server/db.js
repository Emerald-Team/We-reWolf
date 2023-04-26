const mongoose = require('mongoose');

const uri = 'mongodb+srv://werewolf:awooo@testcluster.j05r1cq.mongodb.net/?retryWrites=true&w=majority';
// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }

// console.log(mongoose)
// console.log(mongoose.connect)

mongoose.connect(uri)
  // .then(result => {
  //   console.log('result', result)
  // })
  // .catch(err => {
  //   console.log('error',err)
  // });

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

module.exports = db