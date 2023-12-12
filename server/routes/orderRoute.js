const express = require('express');

const { authenticationMiddleware } = require('../middlewares/AuthenticationMiddleware');
const { createOrder, updateOrderStatus, getMyOrders } = require('../controllers/orderController');
const { authorizationRoleEventOrganizer } = require('../middlewares/AuthorizationRole');

const router = express.Router()

router.post('/create/:eventId', authenticationMiddleware, createOrder)
router.put('/update-status/:orderId', authenticationMiddleware, updateOrderStatus)
router.get('/getMyOrder', authenticationMiddleware, authorizationRoleEventOrganizer, getMyOrders)


module.exports = router;