import saltHash from 'password-salt-and-hash';








const newPassword = (password) => {

  let hashPassword = saltHash.generateSaltHash(password)
  return hashPassword;





}


export default newPassword