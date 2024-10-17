const express = require('express');
const router = express.Router();
const {
    createCategoryController,
    getAllCategoriesController,
    getCategoryByIdController,
    getCategoryByCatIdController,
    getCategoryByNameController,
    getCategoryByTypeController,
    updateCategoryController,
    deleteCategoryController,
} = require('../controllers/categoryController');
const authenticateToken = require('../middlewares/authMiddleware');



//Rutas para categorías
router.post('/create', authenticateToken, createCategoryController);
router.get('/getAll', authenticateToken, getAllCategoriesController);
router.get('/getById/:userid', authenticateToken, getCategoryByIdController);
router.get('/getByCatId/:cat_id', authenticateToken, getCategoryByCatIdController);
router.get('/getByName/:name', authenticateToken, getCategoryByNameController);
router.get('/getByType/:type', authenticateToken, getCategoryByTypeController);
router.put('/update/:id', authenticateToken, updateCategoryController);
router.delete('/delete/:p_category_id/:p_record_id/:p_type', authenticateToken, deleteCategoryController);


module.exports = router;