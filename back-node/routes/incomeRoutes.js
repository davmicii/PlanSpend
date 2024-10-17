const express = require('express');
const router = express.Router();
const {
    createIncomeController,
    createIncomeandCategoryController,
    getAllIncomesController,
    getIncomeByIdController,
    getIncomeByDescriptionController,
    getIncomeByIncomeDateController,
    getIncomeByBetweenDateController,
    updateIncomeController,
    deleteIncomeController
} = require('../controllers/incomeController');
const authenticateToken = require('../middlewares/authMiddleware');


// Rutas para ingresos
router.post('/create', authenticateToken, createIncomeController);
router.post('/create/IncomeAndCategory', authenticateToken, createIncomeandCategoryController);
router.get('/getAllIncomes', authenticateToken, getAllIncomesController);
router.get('/getIncomeById', authenticateToken, getIncomeByIdController);
router.get('/getIncomeByDescription', authenticateToken, getIncomeByDescriptionController);
router.get('/getIncomeByIncomeDate', authenticateToken, getIncomeByIncomeDateController);
router.get('/getIncomeByBetweenDate', authenticateToken, getIncomeByBetweenDateController);
router.put('/update/:id', authenticateToken, updateIncomeController);
router.delete('/delete', authenticateToken, deleteIncomeController);


module.exports = router;