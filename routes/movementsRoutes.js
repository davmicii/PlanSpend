const express = require('express');
const router = express.Router();
const {
    getMovementsByUserIdController
} = require('../controllers/movementsController');
const authenticateToken = require('../middlewares/authMiddleware');


router.get('/getMovementsByUserId/:p_user_id', authenticateToken, getMovementsByUserIdController);


module.exports = router;