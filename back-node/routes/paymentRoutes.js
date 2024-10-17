const express = require('express');
const router = express.Router();
const {
    createPaymentController,
    getAllPaymentsController,
    getPaymentByIdController,
    getPaymentByPaymentsDateController,
    updatePaymentController,
    deletePaymentController
} = require('../controllers/paymentController');
const authenticateToken = require('../middlewares/authMiddleware');


router.post('/create', authenticateToken, createPaymentController);
router.get('/getAllPayments', authenticateToken, getAllPaymentsController);
router.get('/getPaymentById', authenticateToken, getPaymentByIdController);
router.get('/getPaymentByPaymentsDate', authenticateToken, getPaymentByPaymentsDateController);
router.put('/update/:id', authenticateToken, updatePaymentController);
router.delete('/delete', authenticateToken, deletePaymentController);


module.exports = router;