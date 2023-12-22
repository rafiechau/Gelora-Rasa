const { Event, Order, User } = require("../models");
const { handleResponse, handleServerError, handleSuccess, handleCreated } = require("../helper/handleResponseHelper");
const { validateJoi, schemaOrder } = require("../helper/joiHelper");
const midtransClient = require('midtrans-client');
const { handleSendOrderConfirmation } = require("../helper/sendMailHelper");

exports.initialPayment = async (req, res) => {
    try{
        const userId = req.id;
        const { eventId } = req.params;
        const { totalTickets } = req.body;

        const event = await Event.findByPk(eventId);
        const userOrder = await User.findByPk(userId);

        if (!event || !userOrder) {
            return handleResponse(res, 404, { message: 'Event or User not found' });
        }

        const totalPay = totalTickets * event.price;

        let snap = new midtransClient.Snap({
            isProduction: false,
            serverKey: process.env.MIDTRANS_SERVER_KEY
        });

        let parameter = {
            "transaction_details": {
                order_id: `Order-${Date.now()}`,
                gross_amount: totalPay,
            },
            credit_card: {
                secure: true,
            },
            customer_details: {
                email: userOrder.email,
                first_name: userOrder.firstName,
                last_name: userOrder.lastName
            },
        };

        const transaction = await snap.createTransaction(parameter);
        res.status(201).json({
            message: 'Token generated successfully',
            token: transaction.token,
            paymentUrl: transaction.redirect_url
        });
    }catch(error){
        console.log(error)
        return handleServerError(res, error)
    }
}

exports.createOrder = async (req, res) => {
    try {
        const userId = req.id;
        
        const { eventId, totalTickets, ticketsTypes } = req.body;
        console.log(req.body, "ini body loh")

        const event = await Event.findByPk(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const totalPay = totalTickets * event.price;
        const purchaseDate = new Date();
        const randomString = Math.random().toString(36).substring(2, 15);

        const newOrder = await Order.create({
            tanggalPembelian: purchaseDate,
            userId,
            eventId,
            totalTickets,
            totalPay,
            status: 'lunas',
            ticketsTypes
        });

        await handleSendOrderConfirmation({
            name: `${user.firstName} ${user.lastName}`,
            eventName: event.eventName,
            ticketsTypes,
            totalTickets,
            orderId: `${newOrder.id}-${randomString}`,
            purchaseDate: purchaseDate.toISOString().split('T')[0]
        }, user);

        res.status(201).json({ message: 'Order created', order: newOrder });
    } catch (error) {
        console.log(error);
        return handleServerError(res, error);
    }
};






exports.getMyOrders = async(req, res) => {
    try{
        const userId  = req.id
        const myOrders = await Order.findAll({
            where: { userId: userId },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'firstName', 'lastName', 'email'],
                },
                {
                    model: Event,
                    as: 'event', 
                    attributes: ['id', 'eventName', 'date', 'price'], 
                }
            ]
        })
        res.status(200).json({
            success: true,
            data: myOrders
        });
    }catch(error){
        console.log(error)
        return handleServerError(res, error)
    }
}

exports.deleteMyOrder = async(req, res) => {
    try{
        const { orderId } = req.params
        const userId = req.id;

        const orderToDelete = await Order.findOne({ where: { id: orderId, userId: userId } });
        if (!orderToDelete)   {
            return res.status(404).json({ message: "Order not found or you're not authorized to delete this event." });
        }

        await orderToDelete.destroy()
        return res.status(200).json({ message: 'Order successfully deleted.' });
    }catch(error){
        console.log(error)
        return handleServerError(res, error)
    }
}