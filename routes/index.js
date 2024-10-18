const express = require('express');
const router = express.Router();

// Importar rutas individuales
const userRoutes = require('./userRoutes');
const categoryRoutes = require('./categoryRoutes');
const expenseRoutes = require('./expenseRoutes');
const incomeRoutes = require('./incomeRoutes');
const taskRoutes = require('./taskRoutes');
const noteRoutes = require('./noteRoutes');
const movementRoutes = require('./movementsRoutes');
const paymentRoutes = require('./paymentRoutes');

// Usar rutas
router.use('/user', userRoutes);
router.use('/category', categoryRoutes);
router.use('/expense', expenseRoutes);
router.use('/income', incomeRoutes);
router.use('/task', taskRoutes);
router.use('/note', noteRoutes);
router.use('/movement', movementRoutes);
router.use('/payment', paymentRoutes);

module.exports = router;
