const { Event, User, Category, Location } = require("../models");
const { handleResponse, handleServerError, handleSuccess, handleCreated } = require("../helper/handleResponseHelper");
const { validateJoi, schemaEvent } = require("../helper/joiHelper");


exports.getAllEvent = async(req, res) => {
    try{
        const page = parseInt(req.query.page, 10) || 1; 
        const pageSize = parseInt(req.query.pageSize, 10) || 10;

        const offset = (page - 1) * pageSize;

        const events = await Event.findAndCountAll({
            limit: pageSize,
            offset: offset,
            order: [['date', 'ASC']], 
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName', 'email'],
                },
                {
                    model: Category,
                    attributes: ['id', 'categoryName'],
                },
                {
                    model: Location,
                    attributes: ['id', 'namaProvinsi'],
                }
            ],
        });

        // Kirim response dengan events dan informasi pagination
        return res.json({
            events: events.rows,
            totalPages: Math.ceil(events.count / pageSize),
            currentPage: page,
        });
    }catch(error){
        console.log(error)
        return handleServerError(res, error)
    }
}

exports.getMyEvent = async(req, res) => {
    try{
        const userId = req.id;
        const events = await Event.findAll({
            where: { userId: userId },
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName', 'email'],
                },
                {
                    model: Category,
                    attributes: ['id', 'categoryName'],
                },
                {
                    model: Location,
                    attributes: ['id', 'namaProvinsi'],
                }
            ],
            order: [['createdAt', 'DESC']]
        })

        if(!events || events.length === 0){
            return handleResponse(res, 404, { message: 'Your Event Not Found' })
        }

        return handleSuccess(res, { message: "success retrieved from database", data: events  });
    }catch(error){
        console.log(error)
        return handleServerError(res, error)
    }
}

exports.getDetailEvent = async(req, res) => {
    try{
        const { eventId } = req.params;
        const event = await Event.findByPk(eventId, {
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName', 'email'],
                },
                {
                    model: Category,
                    attributes: ['id', 'categoryName'],
                },
                {
                    model: Location,
                    attributes: ['id', 'namaProvinsi'],
                }
            ],
            attributes: { exclude: ['userId', 'locationId', 'categoryId']}
        })

        if(!event){
            return handleResponse(res, 404, { message: 'Event Not Found' })
        }
        return handleResponse(res, 200, event)
    }catch(error){
        console.log(error)
        return handleServerError(res, error)
    }
}
exports.createEvent = async(req, res) => {
    try{
        const image = req.file ? req.file.path : null;
        const newEvent   = { ...req.body, ...(image && { image }) };

        const { error, handleRes } = validateJoi(res, newEvent, schemaEvent);
        if (error) {
          return handleRes;
        }

        if (!newEvent.locationId) {
            return res.status(400).json({ message: "Location ID is required" });
          }
  
        const event = await Event.create(newEvent);
  
        return handleSuccess(res, {
            data: event,
            message: `success created event : ${event.eventName}`,
        });

    }catch(error){
        console.log(error)
        return handleServerError(res, error)
    }
}

exports.updateEvent = async (req, res) => {
    try{
        const { eventId } = req.params
        const updateDataEvent = req.body

        const { error, handleRes } = validateJoi(res, updateDataEvent, schemaEvent)
        if(error){
            return handleRes;
        }

        const currentEvent = await Event.findOne({ where: { id: eventId }})
        if(!currentEvent){
            return handleResponse(res, 404, { message: 'Event not found' })
        }

        await Event.update(updateDataEvent, { where: {id: eventId} })
        return handleCreated(res, { message: "success update data event" });

    }catch(error){
        console.log(error)
        return handleServerError(res, error)
    }
}

exports.deleteEvent = async(req, res) => {
    try{
        const { eventId } = req.params

        const eventToDelete = await Event.findOne({ where: { id: eventId } });
        if (!eventToDelete) {
            return res.status(404).json({ message: "Event not found" });
        }

        await eventToDelete.destroy()
        return res.status(200).json({ message: 'Event successfully deleted.' });
    }catch(error){
        console.log(error)
        return handleServerError(res, error)
    }
}