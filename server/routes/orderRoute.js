const express = require('express');

const { authenticationMiddleware } = require('../middlewares/AuthenticationMiddleware');
const { createOrder, updateOrderStatus } = require('../controllers/orderController');

const router = express.Router()

router.post('/create/:eventId', authenticationMiddleware, createOrder)
router.put('/update-status/:orderId', authenticationMiddleware, updateOrderStatus)


module.exports = router;