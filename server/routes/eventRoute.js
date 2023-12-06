const express = require('express');
const { multerMiddleware } = require('../utils/multer');
const { createEvent, updateEvent, deleteEvent, getAllEvent } = require('../controllers/eventController');

const router = express.Router()

router.get('/', getAllEvent)
router.post('/create', multerMiddleware, createEvent)
router.put('/update/:eventId', multerMiddleware, updateEvent)
router.delete('/delete/:eventId', multerMiddleware, deleteEvent)

module.exports = router;