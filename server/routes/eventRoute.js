const express = require('express');
const { multerMiddleware } = require('../utils/multer');
const { createEvent, updateEvent, getAllEvent, getDetailEvent, getMyEvent, deleteMyEvent } = require('../controllers/eventController');
const { authenticationMiddleware } = require('../middlewares/AuthenticationMiddleware');
const { authorizationRoleEventOrganizer } = require('../middlewares/AuthorizationRole');


const router = express.Router()

router.get('/', authenticationMiddleware, getAllEvent)
router.get('/myEvent', authenticationMiddleware, authorizationRoleEventOrganizer, getMyEvent)
router.get('/detail/:eventId', authenticationMiddleware, getDetailEvent)
router.post('/create', authenticationMiddleware, authorizationRoleEventOrganizer, multerMiddleware, createEvent)
router.put('/update/:eventId', authenticationMiddleware, authorizationRoleEventOrganizer, multerMiddleware, updateEvent)
router.delete('/delete/:eventId', authenticationMiddleware, authorizationRoleEventOrganizer, multerMiddleware, deleteMyEvent)

module.exports = router;