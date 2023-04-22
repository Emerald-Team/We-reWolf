const mongoose = require('mongoose');

const {Schema} = mongoose;

mongoose.connect('mongodb://localhost:27017/werewolfgame').then(() => {console.log('Success!')}).catch((err) => {console.log('mongo connection error:' , err)});

let dataBase = mongoose.connection;

dataBase.on('error', () => {console.log('mongoose connection error')})
dataBase.on('open', () => {console.log('mongoose connection successful')})







const userSchema = new Schema({
  username: {type: String},
  friends: [{name: {type: String}, online: {type: Boolean}}],

  stats: {},
  online: {type: Boolean, default: true},


})


const Users = mongoose.model('users', userSchema);

const newAccount = () => {

  let 







}
