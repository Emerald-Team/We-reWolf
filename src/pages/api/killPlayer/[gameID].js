import model from '../../../server/model'

export default async function handler(req, res) {
  const {method, body} = req

  switch (method) {
    case 'POST' :
      try {
        const {gameID, username} = body

        const updatedGameState = await model.killPlayer(gameID, username)
        res.status(200).json({success: true, data: updatedGameState})
      } catch (error) {
        res.status(400).json({success: false, message: error.message})
      }
    break
    default:
      res.status(400).json({success: false})
      break;
  }
}