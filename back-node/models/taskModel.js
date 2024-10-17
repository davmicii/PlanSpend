const pool = require('../config/db');


// Create Task
const createTask = async (userid, title, description, due_date) => {
    const query = 'SELECT * FROM create_task($1, $2, $3, $4)';
    const values = [userid, title, description, due_date];

    try {
        await pool.query(query, values);
    } catch (err) {
        throw err;
    }
};


// Get all tasks
const getAllTasks = async (id) => {
    const query = 'SELECT * FROM get_all_tasks()';
    
    try {
      const { rows } = await pool.query(query);
      return rows;
    } catch (err) {
      throw err;
    }
};


// Get task by userid
const getTaskByUserId = async (userid) => {
    const query = 'SELECT * FROM get_task_by_id($1)';
    const values = [userid];
    
    try {
      const { rows } = await pool.query(query, values);
      return rows;
    } catch (err) {
      throw err;
    }
};


// Get task by id
const getTaskByTaskId = async (p_task_id) => {
  const query = 'SELECT * FROM get_task_by_idtask($1)';
  const values = [p_task_id];
  
  try {
    const { rows } = await pool.query(query, values);
    return rows;
  } catch (err) {
    throw err;
  }
};

// Get task by isCompleted
const getTaskByIsNotCompleted = async (p_user_id) => {
    const query = 'SELECT * FROM count_incomplete_tasks($1)';
    const values = [p_user_id];
    
    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (err) {
      throw err;
    }
};


// Update task
const updateTask = async (id, title, description, due_date, isCompleted) => {
    const query = 'SELECT * FROM update_task($1, $2, $3, $4, $5)';
    const values = [id, title, description, due_date, isCompleted];
    
    try {
        return await pool.query(query, values);
    } catch (err) {
      throw err;
    }
};


// Delete task
const deleteTask = async (id) => {
  const query = 'SELECT * FROM delete_task($1)';
  const values = [id];

  try {      
    await pool.query(query, values);
  } catch (err) {
    throw err;
  }
};



module.exports = 
{ 
    createTask,
    getAllTasks,
    getTaskByUserId,
    getTaskByTaskId,
    getTaskByIsNotCompleted,
    updateTask,
    deleteTask
}