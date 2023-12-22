const express = require('express');

const { authenticationMiddleware } = require('../middlewares/AuthenticationMiddleware');
const { createOrder, getMyOrders, deleteMyOrder, initialPayment } = require('../controllers/orderController');
const {  authorizationRoleStandardUser } = require('../middlewares/AuthorizationRole');

const router = express.Router()

router.post('/initialPayment/:eventId', authenticationMiddleware, initialPayment)
router.post('/create', authenticationMiddleware, createOrder)
router.get('/getMyOrder', authenticationMiddleware, getMyOrders)
router.delete('/delete/:orderId', authenticationMiddleware, deleteMyOrder)


module.exports = router;