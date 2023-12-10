const express = require('express');

const { authenticationMiddleware } = require('../middlewares/AuthenticationMiddleware');
const { createEventOrganizer } = require('../controllers/eventOrganizerController');


const router = express.Router()

router.post('/create', authenticationMiddleware, createEventOrganizer)



module.exports = router;