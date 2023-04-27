const saltHash = require("password-salt-and-hash"); import {useRouter} from 'next/navigation';
const userDatabase = require('../../server/userdatabase.js');


export default async function handler(req, res){ //const router = useRouter();
  //console.log('req got here', req.body)

  let userDetails = req.body;
  if (userDetails.username) {
    let hasusername = await userDatabase.checkUsername(userDetails.username);

    if (!hasusername.length) {
      res.status(400).send("Username not found.");
    } else {
      let loginPass = userDetails.password;

      let verification = {
        username: userDetails.username,
        password: loginPass,
      };
      let isValid = await userDatabase.verifyUser(verification, "username");
      if (isValid) {
        // req.session.user = user
       res.send("Success");
      } else {
        res.statusCode(400)
      }
    }
  } else if (userDetails.email) {
    let hasEmail = await userDatabase.checkEmail(userDetails.email);
    if (!hasEmail.length) {
      res.status(400).send("Email not found.");
    } else {
      let loginPass = userDetails.password;
      let verification = { email: userDetails.email, password: loginPass };
      let isValid = await userDatabase.verifyUser(verification, "email");

      if (isValid) {
        // req.session.user = user
       res.send("Success");
      } else {
        res.statusCode(400)
      }
    }
  }

};


//export default VerifyHandler
