const mongoose = require('mongoose'); const saltHash = require('password-salt-and-hash'); const uri = 'AVAILABLE FROM MONGODB ATLAS PAGE';

//mongoose.connect(uri);

const {Schema} = mongoose;

mongoose.connect(uri).then(() => {console.log('Success!')}).catch((err) => {console.log('mongo connection error:' , err)});

let dataBase = mongoose.connection;

dataBase.on('error', () => {console.log('mongoose connection error')})
dataBase.on('open', () => {console.log('mongoose connection successful')})







const userSchema = new Schema({
  username: {type: String, unique: true, required: true},
  email: {type: String, unique: true, required: true},
  friends: [{name: {type: String}, online: {type: Boolean}}],
  password: { type: {password: {type: String}, salt: {type: String}}, required: true},

  species: {type: String},
  online: {type: Boolean, default: true},


})


const Users = mongoose.models.users || mongoose.model('users', userSchema);

const checkUsername = async (username) => {

  let nameTaken = await Users.find({username: username})
  //console.log(nameTaken)

  if (!nameTaken.length) {
    return false;

  }


  return "Username is taken! Please try a different one.";
}


const checkEmail = async (email) => {

  let emailInUse = await Users.find({email: email});


  if (!emailInUse.length) {
    return false;
  }

  return "This email is already in use. Please try again.";
}
const newAccount = async (obj) => {

  return Users.create(obj) //.then(() => 'Success Mongoose!').catch((err) => { return err;})



}



const verifyUser = async (infoToVerify, indicator) => {
  if (indicator === 'username') {
    let usernameData = await Users.find({username: infoToVerify.username})
    let passCheck = saltHash.verifySaltHash(usernameData[0].password.salt, usernameData[0].password.password, infoToVerify.password);
    return passCheck;


  } else if (indicator === 'email') {
  let usernameData = await Users.find({email: infoToVerify.email})

    //console.log('info to verify:', infoToVerify, usernameData)
  let passCheck = saltHash.verifySaltHash(usernameData[0].password.salt, usernameData[0].password.password, infoToVerify.password);

  return passCheck;
  }







}


module.exports = {dataBase, newAccount, checkUsername, checkEmail, verifyUser, Users}
