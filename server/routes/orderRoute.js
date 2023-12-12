const express = require('express');

const { authenticationMiddleware } = require('../middlewares/AuthenticationMiddleware');
const { createOrder, updateOrderStatus, getMyOrders, deleteMyOrder } = require('../controllers/orderController');
const {  authorizationRoleStandardUser } = require('../middlewares/AuthorizationRole');

const router = express.Router()

router.post('/create/:eventId', authenticationMiddleware, createOrder)
router.put('/update-status/:orderId', authenticationMiddleware, updateOrderStatus)
router.get('/getMyOrder', authenticationMiddleware, getMyOrders)
router.delete('/delete/:orderId', authenticationMiddleware, deleteMyOrder)


module.exports = router;