const pool = require('../config/db');


// Create income
const createIncome = async (userid, categoryid, amount, description, incomedate) => {
    const query = 'SELECT * FROM create_incomes($1, $2, $3, $4, $5)';
    const values = [userid, categoryid, amount, description, incomedate];

    try {
        await pool.query(query, values);
    } catch (err) {
        throw err;
    }
};



// Create Income and Category
const createIncomeandCategory = async (user_id, category_name, category_type, income_description, income_amount, income_date) => {
  const query = 'SELECT * FROM create_income_and_category($1, $2, $3, $4, $5, $6)';
  const values = [user_id, category_name, category_type, income_description, income_amount, income_date];

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


// Get all incomes
const getAllIncomes = async (id) => {
    const query = 'SELECT * FROM get_all_incomes()';
    
    try {
      const { rows } = await pool.query(query);
      return rows;
    } catch (err) {
      throw err;
    }
};


// Get income by id
const getIncomeById = async (id) => {
    const query = 'SELECT * FROM get_income_by_id($1)';
    const values = [id];
    
    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (err) {
      throw err;
    }
};


// Get icome by description
const getIncomeByDescription = async (description) => {
    const query = 'SELECT * FROM get_income_by_description($1)';
    const values = [description];
    
    try {
      const { rows } = await pool.query(query, values);
      return rows;
    } catch (err) {
      throw err;
    }
};


// Get income by income date
const getIncomeByIncomeDate = async (income_date) => {
    const query = 'SELECT * FROM get_income_by_income_date($1)';
    const values = [income_date];
    
    try {
      const { rows } = await pool.query(query, values);
      return rows;
    } catch (err) {
      throw err;
    }
};


// Get income by income between start and end date
const getIncomeByBetweenDate = async (start_date, end_date) => {
    const query = 'SELECT * FROM get_income_by_between_date($1, $2)';
    const values = [start_date, end_date];
    
    try {
      const { rows } = await pool.query(query, values);
      return rows;
    } catch (err) {
      throw err;
    }
};


// Update income
const updateIncome = async (id, categoryid, amount, description, income_date) => {
    const query = 'SELECT * FROM update_income($1, $2, $3, $4, $5)';
    const values = [id, categoryid, amount, description, income_date];
    
    try {
        return await pool.query(query, values);
    } catch (err) {
      throw err;
    }
};



// Delete income
const deleteIncome = async (id) => {
    const query = 'SELECT * FROM delete_income($1) as success';
    const values = [id];
    
    try {
        const result = await pool.query(query, values);
        return result.rows[0].success; // success será TRUE o FALSE
    } catch (err) {
      throw err;
    }
};


module.exports = 
{
    createIncome,
    createIncomeandCategory,
    getAllIncomes,
    getIncomeById,
    getIncomeByDescription,
    getIncomeByIncomeDate,
    getIncomeByBetweenDate,
    updateIncome,
    deleteIncome
}