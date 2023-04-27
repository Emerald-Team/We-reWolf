import model from '../../../server/model.js'

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    try {
      const {username, previousUsername} = req.body
      const {gameID} = req.query
      const updatedGameState = await model.voteForUser(username, previousUsername, gameID)
      res.status(200).json(updatedGameState)
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  } else {
    res.status(405).json({message: 'Method not allowed'})
  }
}
