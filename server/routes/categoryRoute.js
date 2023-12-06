const express = require('express');
const { getAllCategories, createCategory, updateCategory, deleteCategory } = require('../controllers/categoriesController');
const router = express.Router()

router.get('/', getAllCategories)
router.post('/create', createCategory)
router.put('/update/:categoryId', updateCategory)
router.delete('/delete/:categoryId', deleteCategory)


module.exports = router;