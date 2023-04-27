import model from '../../../server/model.js'

const handler = async (req, res) => {
  const { gameID } = req.query
  if(req.method === 'PUT'){
    console.log(`PUT request received in API for ${gameID} for ${req.body.user}`)
    model.updateLobby(gameID, req.body.user)
    .then(data => (
      res.status(201).send(data)
    ))
    .catch((err) => (
      res.status(401).send(err)
    ))
  } else if (req.method === 'POST'){
    console.log(`POST request received in API for ${gameID} for ${req.body.user}`)

    model.createLobby(gameID, req.body.user)
    .then(data => (
      res.status(201).send(data)
    ))
    .catch(err => (
      res.status(401).send(err)
    ))
  } else if (req.method === 'GET') {
    console.log('GET LOBBY GAME ID CONSOLE LOG',gameID)
    model.getLobby(gameID)
      .then(data => {res.status(200).send(data)})
      .catch(err => {res.status(401).send(err)})
  }
}

export default handler