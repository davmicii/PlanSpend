const bcrypt = require('bcryptjs'); // Importar bcryptjs para el hash y comparación de contraseñas
const jwt = require('jsonwebtoken'); // Importar jsonwebtoken para crear y verificar tokens JWT
const {
    createExpense,
    createExpenseandCategory,
    getAllExpenses,
    getExpenseById,
    getExpenseByDescription,
    getExpenseByExpenseDate,
    getExpenseByBetweenDate,
    updateExpense,
    deleteExpense
} = require('../models/expenseModel'); // Importa la función para obtener mis modelos


// Controlador para crear un gasto
const createExpenseController = async (req, res) => {
    const { userid, categoryid, amount, description, expensedate } = req.body;
  
    try {
        await createExpense(userid, categoryid, amount, description, expensedate);
        res.status(201).json({ message: 'Registro creado exitosamente' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};


// Controlador para crear un gasto con categoría
const createExpenseandCategoryController = async (req, res) => {
  const { user_id, category_name, category_type, expense_description, expense_amount, expense_date } = req.body;

  try {
      await createExpenseandCategory(user_id, category_name, category_type, expense_description, expense_amount, expense_date);
      res.status(201).json({ message: 'Registro creado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Controlador para obtener todos los gastos
const getAllExpensesController = async (req, res) => {
    try {
      const expenses = await getAllExpenses();
      res.status(200).json(expenses);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};



// Controlador para obtener un gasto por ID
const getExpenseByIdController = async (req, res) => {
    const { id } = req.params;
  
    try {
      const expense = await getExpenseById(id);
      
      if (!expense) {
        return res.status(404).json({ message: 'Gasto no encontrado' });
      }
      
      res.status(200).json(expense);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};



// Controlador para obtener un gasto por la descripción(description)
const getExpenseByDescriptionController = async (req, res) => {
    const { description } = req.body;
  
    try {
      const expense = await getExpenseByDescription(description);
      
      if (!expense) {
        return res.status(404).json({ message: 'Gasto no encontrado' });
      }
      
      res.status(200).json(expense);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};



// Controlador para obtener un gasto por la fecha de gasto(exspense_date)
const getExpenseByExpenseDateController = async (req, res) => {
    const { expense_date } = req.body;
  
    try {
      const expense = await getExpenseByExpenseDate(expense_date);
      
      if (!expense) {
        return res.status(404).json({ message: 'Gasto no encontrado' });
      }
      
      res.status(200).json(expense);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};



// Controlador para obtener un gasto por la fecha de gasto(exspense_date)
const getExpenseByBetweenDateController = async (req, res) => {
    const { start_date, end_date } = req.body;
  
    try {
      const expense = await getExpenseByBetweenDate(start_date, end_date);
      
      if (!expense) {
        return res.status(404).json({ message: 'Gasto no encontrado' });
      }
      
      res.status(200).json(expense);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};


//Controlador para actualizar un gasto
const updateExpenseController = async (req, res) => {
    const { id } = req.params;
    const { categoryid, amount, description, expense_date } = req.body;
  
    try {   
      const result = await updateExpense(id, categoryid, amount, description, expense_date);
      
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Gasto no encontrado' });
      }
  
      res.status(200).json({ message: 'Gasto actualizado exitosamente' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};
  
  
  
  //Controlador para eliminar un gasto
  const deleteExpenseController = async (req, res) => {
    const { id } = req.body;
  
    try {   
      const result = await deleteExpense(id);
      
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Gasto no encontrado' });
      }
  
      res.status(200).json({ message: 'Gasto eliminado exitosamente' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

module.exports = 
{
    createExpenseController,
    createExpenseandCategoryController,
    getAllExpensesController,
    getExpenseByIdController,
    getExpenseByDescriptionController,
    getExpenseByExpenseDateController,
    getExpenseByBetweenDateController,
    updateExpenseController,
    deleteExpenseController
}