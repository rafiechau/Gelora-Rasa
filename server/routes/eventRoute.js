const express = require('express');
const { multerMiddleware } = require('../utils/multer');
const { createEvent, updateEvent, deleteEvent, getAllEvent, getDetailEvent } = require('../controllers/eventController');
const { authenticationMiddleware } = require('../middlewares/AuthenticationMiddleware');

const router = express.Router()

router.get('/', authenticationMiddleware, getAllEvent)
router.get('/detail/:eventId', authenticationMiddleware, getDetailEvent)
router.post('/create', authenticationMiddleware, multerMiddleware, createEvent)
router.put('/update/:eventId', authenticationMiddleware, multerMiddleware, updateEvent)
router.delete('/delete/:eventId', authenticationMiddleware, multerMiddleware, deleteEvent)

module.exports = router;