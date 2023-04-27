import model from '../../../server/model'

export default async function handler(req, res) {
  const {gameID} = req.query;
  // console.log(gameID, 'gameID in gameState')
  if (req.method === 'GET') {
    try {
      const gameState = await model.getGameState(gameID)
      return res.status(200).json(gameState)
    } catch (error) {
      console.error(error)
      return res.status(500).json({message: 'Internal server error'})
    }
  } else {
    return res.status(405).json({message: 'Method not allowed'})
  }
}
