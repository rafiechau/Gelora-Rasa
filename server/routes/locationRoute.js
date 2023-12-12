const express = require('express');
const { authenticationMiddleware } = require('../middlewares/AuthenticationMiddleware');
const { authorizationRoleAdmin } = require('../middlewares/AuthorizationRole');
const { getAllLocation, createLocation, updateLocation, deleteLocation } = require('../controllers/locationController');

const router = express.Router()

router.get('/', authenticationMiddleware, getAllLocation)
router.post('/create', authenticationMiddleware, authorizationRoleAdmin, createLocation)
router.put('/update/:locationId', authenticationMiddleware, authorizationRoleAdmin, updateLocation)
router.delete('/delete/:locationId', authenticationMiddleware, authorizationRoleAdmin, deleteLocation)

module.exports = router;