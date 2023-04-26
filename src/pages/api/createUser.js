const saltHash = require("password-salt-and-hash"); import {useRouter} from 'next/navigation'; const userDatabase = require('../../server/userdatabase.js');



export default async function handler(req, res){ //const router = useRouter();

  let userDetails = req.body;
  let usernameTaken = await userDatabase.checkUsername(req.body.username);
  let emailTaken = await userDatabase.checkEmail(req.body.email);
  //console.log("usernameTaken :", usernameTaken, "emailTaken:", emailTaken);

  if (!usernameTaken && !emailTaken) {
    let passwordHash = saltHash.generateSaltHash(req.body.password);
    req.body.password = passwordHash;
    let user;
    await userDatabase

      .newAccount(req.body)
      .then((data) => {


          res.send('Success');

      })
      .catch((err) => {
        res.send(err);
      });
  }
  if (usernameTaken) {
    res.status(400).send(usernameTaken);
    return;
  }
  if (emailTaken) {
    res.status(400).send(emailTaken);
    return;
  }
};


// export default CreateHandler

