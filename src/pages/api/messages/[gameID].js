import model from '../../../server/model.js'

<<<<<<< HEAD
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
=======
export default async function handler (req, res) {
  if (req.method === 'PUT') {
    try {
      const {username, previousUsername} = req.body
      const {gameID} = req.queryconst updatedGameState = await model.voteForUser(username,previousUsername, gameID)
      res.status(200).json(updatedGameState)
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  } else {
    res.status(405).json({message: 'Method not allowed'})
>>>>>>> 19d8193 (added vote resetting)
  }
}