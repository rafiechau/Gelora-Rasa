const { handleSuccess, handleServerError } = require("../helper/handleResponseHelper");
const { handlesendMeetingIdEmail } = require("../helper/sendMailHelper");
const { LiveStreaming, User, Order, Event } = require("../models");

exports.sendMeetinIdToUser = async(req, res) => {
    try{
        const { eventId, meetingId } = req.body

        await LiveStreaming.create({ meetingId, eventId });

        const orders = await Order.findAll({
            where: { eventId: eventId },
            include:  [
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

        let emailSentStatus = true;
        for (const order of orders) {
            const sendStatus = await handlesendMeetingIdEmail(meetingId, order.user.email, order.event.eventName);
            if (!sendStatus) emailSentStatus = false;
        }

        if (emailSentStatus) {
            return handleSuccess(res, {message: "Meeting ID has been sent to user email"});
        } else {
            return handleSuccess(res, {message: "Email for meeting id failed to send"});
        }
    }catch(error){
        console.log(error)
        return handleServerError(res, error)
    }
}