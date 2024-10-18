const pool = require('../config/db');


// Create category
const createCategory = async (userid, catname, type) => {
    const query = 'SELECT * FROM create_category($1, $2, $3)';
    const values = [userid, catname, type];

    try {
        await pool.query(query, values);
    } catch (err) {
        throw err;
    }
};



// Get all categories
const getAllCategories = async (id) => {
    const query = 'SELECT * FROM get_all_categories()';
    
    try {
      const { rows } = await pool.query(query);
      return rows;
    } catch (err) {
      throw err;
    }
};



// Get category by userid
const getCategoryById = async (userid) => {
    const query = 'SELECT * FROM get_category_by_id($1)';
    const values = [userid];
    
    try {
      const { rows } = await pool.query(query, values);
      return rows;
    } catch (err) {
      throw err;
    }
};

// Get category by id
const getCategoryByCatId = async (cat_id) => {
  const query = 'SELECT * FROM get_category_by_catid($1)';
  const values = [cat_id];
  
  try {
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (err) {
    throw err;
  }
};



// Get category by name
const getCategoryByName = async (name) => {
    const query = 'SELECT * FROM get_category_by_name($1)';
    const values = [name];
    
    try {
      const { rows } = await pool.query(query, values);
      return rows;
    } catch (err) {
      throw err;
    }
};



// Get category by type
const getCategoryByType = async (name) => {
    const query = 'SELECT * FROM get_category_by_type($1)';
    const values = [name];
    
    try {
      const { rows } = await pool.query(query, values);
      return rows;
    } catch (err) {
      throw err;
    }
};



// Update category
const updateCategory = async (id, name, type) => {
    const query = 'SELECT * FROM update_category($1, $2, $3)';
    const values = [id, name, type];
    
    try {
        return await pool.query(query, values);
    } catch (err) {
      throw err;
    }
};



// Delete category
const deleteCategory = async (p_category_id, p_record_id, p_type) => {
    const query = 'SELECT * FROM delete_category($1, $2, $3)';
    const values = [p_category_id, p_record_id, p_type];
    
    try {
        return await pool.query(query, values);
    } catch (err) {
      throw err;
    }
};

module.exports = 
{ 
    createCategory,
    getAllCategories,
    getCategoryById, 
    getCategoryByCatId,
    getCategoryByName, 
    getCategoryByType, 
    updateCategory,
    deleteCategory
};