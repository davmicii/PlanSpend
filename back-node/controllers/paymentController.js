const bcrypt = require('bcryptjs'); // Importar bcryptjs para el hash y comparación de contraseñas
const jwt = require('jsonwebtoken'); // Importar jsonwebtoken para crear y verificar tokens JWT
const {
    createPayment,
    getAllPayments,
    getPaymentById,
    getPaymentByPaymentsDate,
    updatePayment,
    deletePayment
} = require('../models/paymentModel'); // Importa la función para obtener mis modelos


// Controlador para crear un pago
const createPaymentController = async (req, res) => {
    const { user_id, amount, description, payment_date, expense_id } = req.body;
  
    try {
        await createPayment(user_id, amount, description, payment_date, expense_id);
        res.status(201).json({ message: 'Registro creado exitosamente' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};


// Controlador para obtener todos los pagos
const getAllPaymentsController = async (req, res) => {
    try {
      const payments = await getAllPayments();
      res.status(200).json(payments);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};


// Controlador para obtener un pago por ID
const getPaymentByIdController = async (req, res) => {
    const { id } = req.body;
  
    try {
      const payment = await getPaymentById(id);
      
      if (!payment) {
        return res.status(404).json({ message: 'Pago no encontrado' });
      }
      
      res.status(200).json(payment);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};


// Controlador para obtener un pago por fechas de pago
const getPaymentByPaymentsDateController = async (req, res) => {
    const { start_date, end_date } = req.body;
  
    try {
      const payments = await getPaymentByPaymentsDate(start_date, end_date);
      
      if (!payments) {
        return res.status(404).json({ message: 'Pagos no encontrados' });
      }
      
      res.status(200).json(payments);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};


//Controlador para actualizar un pago
const updatePaymentController = async (req, res) => {
    const { id } = req.params;
    const { amount, description, payment_date, expense_id } = req.body;
  
    try {   
      const result = await updatePayment(id, amount, description, payment_date, expense_id);
      
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Pago no encontrado' });
      }
  
      res.status(200).json({ message: 'Pago actualizado exitosamente' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};


 //Controlador para eliminar un pago
 const deletePaymentController = async (req, res) => {
    const { id } = req.body;
  
    try {   
      const result = await deletePayment(id);
      
      if (!result) {
        return res.status(404).json({ message: 'Pago no encontrado' });
      }
      res.status(200).json({ message: 'Pago eliminado exitosamente' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};


module.exports = 
{
    createPaymentController,
    getAllPaymentsController,
    getPaymentByIdController,
    getPaymentByPaymentsDateController,
    updatePaymentController,
    deletePaymentController
}