const express = require('express');
const router = express.Router();
const { createUserController,    
    loginUserController, 
    getAllUsersController,
    getUserByIdController,
    updateUserController,
    deleteUserController
} = require('../controllers/userController');


const authenticateToken = require('../middlewares/authMiddleware');

// Ruta pública para iniciar sesión
router.post('/login', loginUserController);


// Rutas protegidas para usuarios
router.post('/create', authenticateToken, createUserController);
router.get('/getAllUsers', authenticateToken, getAllUsersController);
router.get('/getUserById/:id', authenticateToken, getUserByIdController);
router.put('/updateUserById/:id', authenticateToken, updateUserController);
router.delete('/deleteUserById/:id', authenticateToken, deleteUserController);

module.exports = router;
