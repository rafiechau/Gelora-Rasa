const express = require('express');
const { getAllCategories, createCategory, updateCategory, deleteCategory } = require('../controllers/categoriesController');
const { authenticationMiddleware } = require('../middlewares/AuthenticationMiddleware');
const { authorizationRoleAdmin } = require('../middlewares/AuthorizationRole');
const router = express.Router()

router.get('/', getAllCategories)
router.post('/create', authenticationMiddleware, authorizationRoleAdmin, createCategory)
router.put('/update/:categoryId', authenticationMiddleware, authorizationRoleAdmin, updateCategory)
router.delete('/delete/:categoryId', authenticationMiddleware, authorizationRoleAdmin, deleteCategory)


module.exports = router;