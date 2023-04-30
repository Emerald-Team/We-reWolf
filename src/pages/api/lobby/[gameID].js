import model from '../../../server/model.js'

export default async function handler(req, res) {
  const { gameID } = req.query
  if(req.method === 'PUT'){
    return model.updateLobby(gameID, req.body.user)
      .then(data => (
        res.status(201).send(data)
      ))
      .catch((err) => (
        res.status(401).send(err)
      ))
  } else if (req.method === 'POST'){
      return model.createLobby(gameID, req.body.user)
        .then(data => (
          res.status(201).send(data)
        ))
        .catch(err => (
          res.status(401).send(err)
        ))
  } else /*if (req.method === 'GET')*/ {
      return model.getLobby(gameID)
        .then(data => (res.status(200).send(data)))
        .catch(err => (res.status(401).send(err)))
  }
}
