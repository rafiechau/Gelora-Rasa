const express = require('express');
const { multerMiddleware } = require('../utils/multer');
const { createEvent, updateEvent, getAllEvent, getDetailEvent, getMyEvent, deleteMyEvent, updateEventStatus, getUserProfileById } = require('../controllers/eventController');
const { authenticationMiddleware } = require('../middlewares/AuthenticationMiddleware');
const { authorizationRoleEventOrganizer } = require('../middlewares/AuthorizationRole');


const router = express.Router()

router.get('/', getAllEvent)
router.get('/myEvent', authenticationMiddleware, authorizationRoleEventOrganizer, getMyEvent)
router.get('/event-organizer/:userId', authenticationMiddleware, getUserProfileById)
router.get('/detail/:eventId', authenticationMiddleware, getDetailEvent)
router.post('/create', authenticationMiddleware, authorizationRoleEventOrganizer, multerMiddleware, createEvent)
router.put('/update/:eventId', authenticationMiddleware, authorizationRoleEventOrganizer, multerMiddleware, updateEvent)
router.put('/update-status/:eventId', authenticationMiddleware, updateEventStatus);
router.delete('/delete/:eventId', authenticationMiddleware, authorizationRoleEventOrganizer, multerMiddleware, deleteMyEvent)


module.exports = router;