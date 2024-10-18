const {
    getMovementsByUserid,
} = require('../models/movementsModel'); // Importa la función para obtener mis modelos


// Controlador para obtener todos los movimientos por userid
const getMovementsByUserIdController = async (req, res) => {
    const { p_user_id } = req.params;
  
    try {
      const movements = await getMovementsByUserid(p_user_id);
      
      if (!movements) {
        return res.status(404).json({ message: 'Sin movimientos' });
      }
      
      res.status(200).json(movements);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};


module.exports = {
    getMovementsByUserIdController,
}