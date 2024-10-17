const express = require('express');
const router = express.Router();
const {
    createNoteController,
    getNoteByUserIdController,
    updateCategoryController,
} = require('../controllers/noteController');
const authenticateToken = require('../middlewares/authMiddleware');



//Rutas para notas
router.post('/create', authenticateToken, createNoteController);
router.get('/getNoteById/:p_user_id', authenticateToken, getNoteByUserIdController);
router.put('/update/:p_note_id', authenticateToken, updateCategoryController);


module.exports = router;