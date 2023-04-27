import model from '../../../server/model'

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const {gameID, users, phase} = req.body
    try {
      const gameState = await model.createGame({gameID, users, phase})
      return res.status(200).json(gameState)
    } catch (error) {
      console.error(error)
      return res.status(500).json({message: 'Internal server error: ', error})
    }
  } else {
    return res.status(405).json({message: 'Method not allowed'})
  }
}

export default handler