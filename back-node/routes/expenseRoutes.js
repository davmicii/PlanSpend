const express = require('express');
const router = express.Router();
const {
    createExpenseController,
    createExpenseandCategoryController,
    getAllExpensesController,
    getExpenseByIdController,
    getExpenseByDescriptionController,
    getExpenseByExpenseDateController,
    getExpenseByBetweenDateController,
    updateExpenseController,
    deleteExpenseController
} = require('../controllers/expenseController');
const authenticateToken = require('../middlewares/authMiddleware');



//Rutas para gastos
router.post('/create', authenticateToken, createExpenseController);
router.post('/create/ExpenseAndCategory', authenticateToken, createExpenseandCategoryController);
router.get('/getAllExpenses', authenticateToken, getAllExpensesController);
router.get('/getExpenseById/:id', authenticateToken, getExpenseByIdController);
router.get('/getExpenseByDescription', authenticateToken, getExpenseByDescriptionController);
router.get('/getExpenseByExpenseDate', authenticateToken, getExpenseByExpenseDateController);
router.get('/getExpenseByBetweenDate', authenticateToken, getExpenseByBetweenDateController);
router.put('/update/:id', authenticateToken, updateExpenseController);
router.delete('/delete/', authenticateToken, deleteExpenseController);





module.exports = router;