const express = require('express');
const { authenticationMiddleware } = require('../middlewares/AuthenticationMiddleware');
const { getAllLocation } = require('../controllers/locationController');

const router = express.Router()

router.get('/', authenticationMiddleware, getAllLocation)

module.exports = router;