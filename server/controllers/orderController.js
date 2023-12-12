const { Event, Order, User } = require("../models");
const { handleResponse, handleServerError, handleSuccess, handleCreated } = require("../helper/handleResponseHelper");
const { validateJoi, schemaOrder } = require("../helper/joiHelper");
const midtransClient = require('midtrans-client');



exports.createOrder = async (req, res) => {
    try{
        const userId = req.id;
        const { eventId } = req.params;
        const  { totalTickets, ticketsTypes }= req.body;
        console.log(totalTickets)
        console.log(ticketsTypes)

        const { error, handleRes } = validateJoi(res, req.body, schemaOrder);
        if (error) {
          return handleRes;
        }

        const event = await Event.findByPk(eventId)
        const userOrder = await User.findByPk(userId);

        // const alreadyOrder =  await Order.findOne({where: { userId: userId, eventId: eventId }})
        // if(alreadyOrder){
        //     return res.status(403).json({
        //         message: "User already order "
        //     });
        // }

        if(!event || !userOrder){
            return handleResponse(res, 404, { message: 'Event or User not found' })
        }

        const totalPay = totalTickets * event.price

        const purchaseDate = new Date();
        const newOrder = await Order.create({
            tanggalPembelian: purchaseDate,
            userId,
            eventId,
            totalTickets,
            totalPay,
            status: 'Pending',
            ticketsTypes,
        });

        let snap = new midtransClient.Snap({
            isProduction: false,
            serverKey: process.env.MIDTRANS_SERVER_KEY
        })

        let parameter = {
            "transaction_details": {
                order_id: `Order-${newOrder.id}`,
                gross_amount: totalPay,
            },
            credit_card: {
                secure: true,
            },
            customer_details: {
                email: userOrder?.email,
                first_name: userOrder?.firstName,
                last_name: userOrder?.lastName
            },
        }
        const transaction = await snap.createTransaction(parameter);
        res.status(201).json({
            message: 'Order created successfully',
            order: newOrder,
            token: transaction.token,
            paymentUrl: transaction.redirect_url
        });
    }catch(error){
        console.log(error)
        return handleServerError(res, error)
    }
}

exports.updateOrderStatus = async(req, res) => {
    try{
        const { orderId } = req.params;

        const order = await Order.findByPk(orderId);
        if(!order){
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = "lunas";
        await order.save();

        res.status(200).json({ message: 'Order status updated', order })
    }catch(error){
        console.log(error)
        return handleServerError(res, error)
    }
}

exports.getMyOrders = async(req, res) => {
    try{
        const { userId } = req.id
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