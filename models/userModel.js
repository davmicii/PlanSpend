const pool = require('../config/db');


// Create user
const createUser = async (username, email, password_hash) => {
  const query = 'SELECT create_user($1, $2, $3)';
  const values = [username, email, password_hash];
  
  try {
    await pool.query(query, values);
  } catch (err) {
    throw err;
  }
};


// Get user by email
const getUserByEmail = async (email) => {
  const query = 'SELECT * FROM get_user_by_email($1)';
  const values = [email];
  
  try {
    const { rows } = await pool.query(query, values);
    //console.log('Datos del usuario:', rows[0]);
    return rows[0];
  } catch (err) {
    throw err;
  }
};


// Get all users
const getAllUsers = async () => {
  const query = 'SELECT * FROM get_all_users()';
  
  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (err) {
    throw err;
  }
};


// Get user by ID
const getUserById = async (id) => {
  const query = 'SELECT * FROM get_user_by_id($1)';
  const values = [id];
  
  try {
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (err) {
    throw err;
  }
};


//Update user
const updateUserById = async (id, username, email, password_hash) => {
  const query = 'SELECT update_user($1, $2, $3, $4)';
  const values = [id, username, email, password_hash];
  
  try {
    return await pool.query(query, values);
  } catch (err) {
    throw err;
  }
};


// Delete user
const deleteUserById = async (id) => {
  const query = 'SELECT delete_user($1)'; // Suponiendo que tienes una función en PostgreSQL para eliminar un usuario
  const values = [id];
  
  try {
    return await pool.query(query, values);
  } catch (err) {
    throw err;
  }
};


module.exports = { createUser, getUserByEmail, getAllUsers, getUserById, updateUserById, deleteUserById };
