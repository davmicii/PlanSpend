const {
    createTask,
    getAllTasks,
    getTaskByTaskId,
    getTaskByUserId,
    getTaskByIsNotCompleted,  
    updateTask,
    deleteTask
} = require('../models/taskModel'); // Importa la función para obtener mis modelos


// Controlador para crear una tarea
const createTaskController = async (req, res) => {
    const { userid, title, description, due_date } = req.body;
  
    try {
        await createTask(userid, title, description, due_date);
        res.status(201).json({ message: 'Registro creado exitosamente' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};


// Controlador para obtener todas las tareas
const getAllTasksController = async (req, res) => {
    try {
      const tasks = await getAllTasks();
      res.status(200).json(tasks);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};


// Controlador para obtener una tarea por USERID
const getTaskByUserIdController = async (req, res) => {
    const { userid } = req.body;
  
    try {
      const task = await getTaskByUserId(userid);
      
      if (!task) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
      }
      
      res.status(200).json(task);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};


// Controlador para obtener una tarea por ID
const getTaskByTaskIdController = async (req, res) => {
  const { p_task_id } = req.body;

  try {
    const task = await getTaskByTaskId(p_task_id);
    
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Controlador para obtener una tarea por isCompleted
const getTaskByIsNotCompletedController = async (req, res) => {
    const { p_user_id } = req.params;
  
    try {
      const task = await getTaskByIsNotCompleted(p_user_id);
      
      if (!task) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
      }
      
      res.status(200).json(task);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};


//Controlador para actualizar una tarea
const updateTaskController = async (req, res) => {
    const { id } = req.params;
    const { title, description, due_date, isCompleted } = req.body;
  
    try {   
      const result = await updateTask(id, title, description, due_date, isCompleted);
      
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
      }
  
      res.status(200).json({ message: 'Tarea actualizada exitosamente' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};


  //Controlador para eliminar una tarea
  const deleteTaskController = async (req, res) => {
    const { p_task_id } = req.params; 
  
    try {   
      await deleteTask(p_task_id);
      res.status(200).json({ message: 'Tarea eliminada exitosamente' })
    } catch (err) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }  



module.exports = 
{
    createTaskController,
    getAllTasksController,
    getTaskByUserIdController,
    getTaskByTaskIdController,
    getTaskByIsNotCompletedController,
    updateTaskController,
    deleteTaskController,
}