const bcrypt = require('bcryptjs'); // Importar bcryptjs para el hash y comparación de contraseñas
const jwt = require('jsonwebtoken'); // Importar jsonwebtoken para crear y verificar tokens JWT
const {
    createIncome,
    createIncomeandCategory,
    getAllIncomes,
    getIncomeById,
    getIncomeByDescription,
    getIncomeByIncomeDate,
    getIncomeByBetweenDate,
    updateIncome,
    deleteIncome
} = require('../models/incomeModel'); // Importa la función para obtener mis modelos


// Controlador para crear un ingreso
const createIncomeController = async (req, res) => {
    const { userid, categoryid, amount, description, incomedate } = req.body;
  
    try {
        await createIncome(userid, categoryid, amount, description, incomedate);
        res.status(201).json({ message: 'Registro creado exitosamente' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};



// Controlador para crear un ingreso con categoría
const createIncomeandCategoryController = async (req, res) => {
  const { user_id, category_name, category_type, income_description, income_amount, income_date } = req.body;

  try {
      await createIncomeandCategory(user_id, category_name, category_type, income_description, income_amount, income_date);
      res.status(201).json({ message: 'Registro creado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Controlador para obtener todos los ingresos
const getAllIncomesController = async (req, res) => {
    try {
      const incomes = await getAllIncomes();
      res.status(200).json(incomes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};


// Controlador para obtener un ingreso por ID
const getIncomeByIdController = async (req, res) => {
    const { id } = req.body;
  
    try {
      const income = await getIncomeById(id);
      
      if (!income) {
        return res.status(404).json({ message: 'Ingreso no encontrado' });
      }
      
      res.status(200).json(income);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};


// Controlador para obtener un ingreso por descripción(description)
const getIncomeByDescriptionController = async (req, res) => {
    const { description } = req.body;
  
    try {
      const income = await getIncomeByDescription(description);
      
      if (!income) {
        return res.status(404).json({ message: 'Ingreso no encontrado' });
      }
      
      res.status(200).json(income);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};


// Controlador para obtener un ingreso por la fecha de ingreso(income_date)
const getIncomeByIncomeDateController = async (req, res) => {
    const { income_date } = req.body;
  
    try {
      const income = await getIncomeByIncomeDate(income_date);
      
      if (!income) {
        return res.status(404).json({ message: 'Ingreso no encontrado' });
      }
      
      res.status(200).json(income);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};


// Controlador para obtener un ingreso por la fecha de ingreso(income_date)
const getIncomeByBetweenDateController = async (req, res) => {
    const { start_date, end_date } = req.body;
  
    try {
      const income = await getIncomeByBetweenDate(start_date, end_date);
      
      if (!income) {
        return res.status(404).json({ message: 'Ingresos no encontrados' });
      }
      
      res.status(200).json(income);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};


//Controlador para actualizar un ingreso
const updateIncomeController = async (req, res) => {
    const { id } = req.params;
    const { categoryid, amount, description, income_date } = req.body;
  
    try {   
      const result = await updateIncome(id, categoryid, amount, description, income_date);
      
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Ingreso no encontrado' });
      }
  
      res.status(200).json({ message: 'Ingreso actualizado exitosamente' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  
  
  //Controlador para eliminar un ingreso
  const deleteIncomeController = async (req, res) => {
    const { id } = req.body;
  
    try {   
      const result = await deleteIncome(id);
      
      if (!result) {
        return res.status(404).json({ message: 'Ingreso no encontrado' });
      }
      res.status(200).json({ message: 'Ingreso eliminado exitosamente' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};


module.exports =
{
    createIncomeController,
    createIncomeandCategoryController,
    getAllIncomesController,
    getIncomeByIdController,
    getIncomeByDescriptionController,
    getIncomeByIncomeDateController,
    getIncomeByBetweenDateController,
    updateIncomeController,
    deleteIncomeController
}