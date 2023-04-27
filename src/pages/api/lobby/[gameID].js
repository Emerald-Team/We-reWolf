import model from '../../../server/model.js'

const handler = async (req, res) => {
  const { gameID } = req.query
  if(req.method === 'PUT'){

    model.updateLobby(gameID, req.body.user)
    .then(data => (
      res.status(201).send(data)
    ))
    .catch((err) => (
      res.status(401).send(err)
    ))
  } else if (req.method === 'POST'){
    model.createLobby(gameID, req.body.user)
    .then(data => (
      res.status(201).send(data)
    ))
    .catch(err => (
      res.status(401).send(err)
    ))
  } else if (req.method === 'GET') {
    model.getLobby(gameID)
      .then(data => {res.status(200).send(data)})
      .catch(err => {res.status(401).send(err)})
  }
}
