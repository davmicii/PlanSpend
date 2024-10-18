const pool = require('../config/db');

// Get movements by userid
const getMovementsByUserid = async (p_user_id) => {  
  const setLcTimeQuery = "SET lc_time = 'es_CO.UTF-8'";
  const query = 'SELECT * FROM get_user_movements($1)';
  const values = [p_user_id];    
  try {
    await pool.query(setLcTimeQuery);
    const { rows } = await pool.query(query, values);
    return rows;
  } catch (err) {
    throw err;
  }
};



module.exports = {
    getMovementsByUserid,
}