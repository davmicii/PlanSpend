const pool = require('../config/db');


// Create expense
const createExpense = async (userid, categoryid, amount, description, expensedate) => {
    const query = 'SELECT * FROM create_expense($1, $2, $3, $4, $5)';
    const values = [userid, categoryid, amount, description, expensedate];

    try {
        await pool.query(query, values);
    } catch (err) {
        throw err;
    }
};


// Create expense and Category
const createExpenseandCategory = async (user_id, category_name, category_type, expense_description, expense_amount, expense_date) => {
  const query = 'SELECT * FROM create_expense_and_category($1, $2, $3, $4, $5, $6)';
  const values = [user_id, category_name, category_type, expense_description, expense_amount, expense_date];

  try {
      // Iniciar transacción
      await pool.query('BEGIN');
      // Llamar a la función de PostgreSQL
      await pool.query(query, values);
      // Confirmar transacción
      await pool.query('COMMIT');
  } catch (err) {
      // Si ocurre algún error, deshacer la transacción
      await pool.query('ROLLBACK');
      res.status(500).json({ error: err.message });
    }
};


// Get all expenses
const getAllExpenses = async (id) => {
    const query = 'SELECT * FROM get_all_expenses()';
    
    try {
      const { rows } = await pool.query(query);
      return rows;
    } catch (err) {
      throw err;
    }
};



// Get expense by id
const getExpenseById = async (id) => {
    const query = 'SELECT * FROM get_expense_by_id($1)';
    const values = [id];
    
    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (err) {
      throw err;
    }
};



// Get expense by description
const getExpenseByDescription = async (description) => {
    const query = 'SELECT * FROM get_expense_by_description($1)';
    const values = [description];
    
    try {
      const { rows } = await pool.query(query, values);
      return rows;
    } catch (err) {
      throw err;
    }
};



// Get expense by expense date
const getExpenseByExpenseDate = async (expense_date) => {
    const query = 'SELECT * FROM get_expense_by_expense_date($1)';
    const values = [expense_date];
    
    try {
      const { rows } = await pool.query(query, values);
      return rows;
    } catch (err) {
      throw err;
    }
};



// Get expense by expense between start and end date
const getExpenseByBetweenDate = async (start_date, end_date) => {
    const query = 'SELECT * FROM get_expense_by_between_date($1, $2)';
    const values = [start_date, end_date];
    
    try {
      const { rows } = await pool.query(query, values);
      return rows;
    } catch (err) {
      throw err;
    }
};


// Update expense
const updateExpense = async (id, categoryid, amount, description, expense_date) => {
    const query = 'SELECT * FROM update_expense($1, $2, $3, $4, $5)';
    const values = [id, categoryid, amount, description, expense_date];
    
    try {
        return await pool.query(query, values);
    } catch (err) {
      throw err;
    }
};



// Delete expense
const deleteExpense = async (id) => {
    const query = 'SELECT * FROM delete_expense($1)';
    const values = [id];
    
    try {
        return await pool.query(query, values);
    } catch (err) {
      throw err;
    }
};


module.exports = 
{ 
    createExpense,
    createExpenseandCategory,
    getAllExpenses,
    getExpenseById,
    getExpenseByDescription,
    getExpenseByExpenseDate,
    getExpenseByBetweenDate,
    updateExpense,
    deleteExpense
}