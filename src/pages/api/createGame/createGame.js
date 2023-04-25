import db from '../../../server/db'
import model from '../../../server/model'

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const {users, phase} = req.body

    try {
      const gameState = await model.createGame({users, phase})
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