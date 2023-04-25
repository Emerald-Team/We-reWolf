const saltHash = require("password-salt-and-hash");



const Handler = async (req, res) => {
  console.log("req got here:", req.body);
  let userDetails = req.body;
  let usernameTaken = await userDatabase.checkUsername(req.body.username);
  let emailTaken = await userDatabase.checkEmail(req.body.email);
  console.log("usernameTaken :", usernameTaken, "emailTaken:", emailTaken);

  if (!usernameTaken && !emailTaken) {
    let passwordHash = saltHash.generateSaltHash(req.body.password);
    req.body.password = passwordHash;
    let user;

    await userDatabase
      .newAccount(req.body)
      .then((msg) => {
        if (msg === "Success!") {
          req.session.user = req.body.username;
          res.redirect("/lobby");
        }
      })
      .catch((err) => {
        res.redirect("/signup");
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
