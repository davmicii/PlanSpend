const {
    createCategory,
    getAllCategories,
    getCategoryById,
    getCategoryByCatId,
    getCategoryByName,
    getCategoryByType,
    updateCategory,
    deleteCategory,
} = require('../models/categoriesModel'); // Importa la función para obtener mis modelos



// Controlador para crear una categoria
const createCategoryController = async (req, res) => {
    const { userid, catname, type } = req.body;
  
    try {
        await createCategory(userid, catname, type);
        res.status(201).json({ message: 'Categoría creada exitosamente' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};



// Controlador para obtener todas las categorias
const getAllCategoriesController = async (req, res) => {
  try {
    const users = await getAllCategories();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Controlador para obtener una categoría por userid
const getCategoryByIdController = async (req, res) => {
    const { userid } = req.params;
  
    try {
      const category = await getCategoryById(userid);
      
      if (!category) {
        return res.status(404).json({ message: 'Categoría no encontrada' });
      }
      
      res.status(200).json(category);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};


// Controlador para obtener una categoría por ID
const getCategoryByCatIdController = async (req, res) => {
  const { cat_id } = req.params;

  try {
    const category = await getCategoryByCatId(cat_id);
    
    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
  


// Controlador para obtener una categoría por nombre(name)
const getCategoryByNameController = async (req, res) => {
  const { name } = req.params;

  try {
    const category = await getCategoryByName(name);
    
    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Controlador para obtener una categoría por nombre(name)
const getCategoryByTypeController = async (req, res) => {
  const { type } = req.params;

  try {
    const category = await getCategoryByType(type);
    
    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



//Controlador para actualizar una categoría
const updateCategoryController = async (req, res) => {
  const { id } = req.params;
  const { name, type } = req.body;

  try {   
    const result = await updateCategory(id, name, type);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    res.status(200).json({ message: 'Categoría actualizada exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



//Controlador para eliminar una categoría
const deleteCategoryController = async (req, res) => {
  const { p_category_id, p_record_id, p_type } = req.params;

  try {   
    const result = await deleteCategory(p_category_id, p_record_id, p_type);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    res.status(200).json({ message: 'Categoría eliminada exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = 
{ 
  createCategoryController,
  getAllCategoriesController,
  getCategoryByIdController,
  getCategoryByCatIdController,
  getCategoryByNameController, 
  getCategoryByType,
  getCategoryByTypeController,
  updateCategoryController,
  deleteCategoryController,
};