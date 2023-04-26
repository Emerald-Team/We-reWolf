import model from '../../../server/model'

const handler = async (req, res) => {
<<<<<<< HEAD
  
=======
>>>>>>> main
  const {gameID} = req.query;
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

export default handler