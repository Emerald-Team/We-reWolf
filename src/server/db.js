const mongoose = require('mongoose')

const uri = 'mongodb+srv://werewolf:awooo@testcluster.j05r1cq.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(uri);

const database = mongoose.connection;

const messageSchema = new mongoose.Schema({
  gameID: String,
  user: String,
  body: String,
  sentAt: { type: Date, default: Date.now },
  visibleTo: [{ type: String }]
})

const db = {
  Message: mongoose.models.Message || mongoose.model('Message', messageSchema)
}

export default db