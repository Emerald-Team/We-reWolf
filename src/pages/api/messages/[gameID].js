import model from '../../../server/model.js'

const handler = async (req, res) => {
  const { gameID } = req.query
  console.log('called the func boss')
  if(req.method === 'POST'){
    model.postMessage(gameID, req.body)
    .then(data => {
      res.status(201).send(data)
    })
    .catch(err => {
      res.status(401).send(err)
    })
  } else if (req.method === 'GET'){
    model.getMessages(gameID)
    .then(data => {
      res.status(200).send(data)
    })
    .catch(err => {
      res.status(400).send(err)
    })
  }
}

export default handler