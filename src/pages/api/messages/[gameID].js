import model from '../../../server/model.js'

const handler = async (req, res) => {
  // console.log('messages!')
  const { gameID } = req.query
  if(req.method === 'POST'){
    await model.postMessage(gameID, req.body)
    .then(data => {
      return res.status(201).send(data)
    })
    .catch(err => {
      return res.status(401).send(err)
    })
  } else if (req.method === 'GET'){
    await model.getMessages(gameID)
    .then(data => {

      return res.status(200).send(data)
    })
    .catch(err => {
      return res.status(400).send(err)
    })
  }
}