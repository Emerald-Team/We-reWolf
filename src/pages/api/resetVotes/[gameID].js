import model from '../../../server/model'

export default async function handler(req, res) {
  const { gameID } = req.query

  if (req.method === 'PUT'){
    try {
      const updatedGameState = await model.resetVotes(gameID)
      res.status(200).json(updatedGameState)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}