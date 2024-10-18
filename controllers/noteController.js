const {
    createNote,
    getNotesById,
    updateisFavoriteStatus,
} = require('../models/noteModel'); // Importa la función para obtener mis modelos


// Controlador para crear una nota
const createNoteController = async (req, res) => {
    const { p_user_id, p_title, p_description, p_is_favorite } = req.body;
  
    try {
        await createNote(p_user_id, p_title, p_description, p_is_favorite);
        res.status(201).json({ message: 'Nota creada exitosamente' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

// Controlador para obtener una categoría por userid
const getNoteByUserIdController = async (req, res) => {
    const { p_user_id } = req.params;
  
    try {
      const note = await getNotesById(p_user_id);
      
      if (!note) {
        return res.status(404).json({ message: 'Nota no encontrada' });
      }
      
      res.status(200).json(note);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};


//Controlador para actualizar una categoría
const updateCategoryController = async (req, res) => {
    const { p_note_id } = req.params;
    const { pis_favorite } = req.body;
  
    try {   
      const result = await updateisFavoriteStatus(p_note_id, pis_favorite);
      
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Nota no encontrada' });
      }
  
      res.status(200).json({ message: 'Nota actualizada exitosamente' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

module.exports = {
    createNoteController,
    getNoteByUserIdController,
    updateCategoryController,
}