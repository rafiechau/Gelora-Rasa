const express = require('express');

const { authenticationMiddleware } = require('../middlewares/AuthenticationMiddleware');
const { createOrder, getMyOrders, deleteMyOrder, initialPayment, hasUserOrderedEvent } = require('../controllers/orderController');
const {  authorizationRoleStandardUser } = require('../middlewares/AuthorizationRole');

const router = express.Router()

router.post('/initialPayment/:eventId', authenticationMiddleware, initialPayment)
router.post('/create', authenticationMiddleware, createOrder)
router.get('/getMyOrder', authenticationMiddleware, getMyOrders)
router.get('/check-order/:eventId', authenticationMiddleware, hasUserOrderedEvent)
router.delete('/delete/:orderId', authenticationMiddleware, deleteMyOrder)


module.exports = router;