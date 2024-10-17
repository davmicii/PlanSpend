const pool = require('../config/db');


// Create Payment
const createPayment = async (user_id, amount, description, payment_date, expense_id) => {
    const query = 'SELECT * FROM create_payment($1, $2, $3, $4, $5)';
    const values = [user_id, amount, description, payment_date, expense_id];

    try {
        await pool.query(query, values);
    } catch (err) {
        throw err;
    }
};



// Get all payments
const getAllPayments = async (id) => {
    const query = 'SELECT * FROM get_all_payments()';
    
    try {
      const { rows } = await pool.query(query);
      return rows;
    } catch (err) {
      throw err;
    }
};


// Get payment by id
const getPaymentById = async (id) => {
    const query = 'SELECT * FROM get_payment_by_id($1)';
    const values = [id];
    
    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (err) {
      throw err;
    }
};


// Get payment by payments date
const getPaymentByPaymentsDate = async (start_date, end_date) => {
    const query = 'SELECT * FROM get_payment_by_payments_date($1,$2)';
    const values = [start_date, end_date];
    
    try {
      const { rows } = await pool.query(query, values);
      return rows;
    } catch (err) {
      throw err;
    }
};



// Update payment
const updatePayment = async (id, amount, description, payment_date, expense_id) => {
    const query = 'SELECT * FROM update_payment($1, $2, $3, $4, $5)';
    const values = [id, amount, description, payment_date, expense_id];
    
    try {
        return await pool.query(query, values);
    } catch (err) {
      throw err;
    }
};


// Delete payment
const deletePayment = async (id) => {
    const query = 'SELECT * FROM delete_payment($1) as success';
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
    createPayment,
    getAllPayments,
    getPaymentById,
    getPaymentByPaymentsDate,
    updatePayment,
    deletePayment
}