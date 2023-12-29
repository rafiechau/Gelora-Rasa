const fs = require('fs');
const path = require('path');
const { Event, User, Category, Location } = require("../models");
const { handleResponse, handleServerError, handleSuccess, handleCreated } = require("../helper/handleResponseHelper");
const { validateJoi, schemaEvent } = require("../helper/joiHelper");


exports.getAllEvent = async(req, res) => {
    try{
        const page = parseInt(req.query.page, 10) || 1; 
        const pageSize = parseInt(req.query.pageSize, 10) || 10;

        const offset = (page - 1) * pageSize;

        const events = await Event.findAndCountAll({
            where:{
                status: 'active'
            },
            limit: pageSize,
            offset: offset,
            order: [['date', 'ASC']], 
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName', 'email', 'imagePath'],
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

        return res.json({
            events: events.rows,
            count: events.count,
            totalPages: Math.ceil(events.count / pageSize),
            currentPage: page,
        });
    }catch(error){
        console.log(error)
        return handleServerError(res, error)
    }
}

exports.getUserProfileById = async(req, res) => {
    try{
        const { userId } = req.params;
    
        const userProfile = await User.findOne({
            include: [
              {
                model: Event,
                where: { userId }, // Filter berdasarkan 'userId'
              },
            ],
        });
        if (!userProfile) {
            return res.status(404).json({ message: 'Profil pengguna tidak ditemukan' });
        }


    return handleSuccess(res, { message: "success retrieved from database", data: userProfile  });
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

        if (!newEvent.categoryId) {
            return res.status(400).json({ message: "Category id is required" });
        }

        if (!newEvent.userId) {
            return res.status(400).json({ message: "User ID is required" });
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
        const imagePath = req?.file?.path;
        const { eventId } = req.params
        const updateDataEvent = req.body
        console.log(updateDataEvent, "<<update event")

        const { error, handleRes } = validateJoi(res, updateDataEvent, schemaEvent)
        if(error){
            return handleRes;
        }

        const currentEvent = await Event.findOne({ where: { id: eventId }})
        if(!currentEvent){
            return handleResponse(res, 404, { message: 'Event not found' })
        }

        if (imagePath) {
            updateDataEvent.image = imagePath.replace(/\//g, '\\'); 
        
            if (currentEvent.image) {
                const fullOldImagePath = path.join(__dirname, '..', currentEvent.image); 
    
                fs.unlink(fullOldImagePath, (err) => {
                    if (err) {
                        console.error('Failed to delete old image:', err);
                    }
                });
            }
        }

        await Event.update(updateDataEvent, { where: {id: eventId} })
        return handleCreated(res, { message: "success update data event" });

    }catch(error){
        console.log(error)
        return handleServerError(res, error)
    }
}

exports.updateEventStatus = async(req, res) => {
    try{
        const { eventId } = req.params;
        const newStatus = { status: 'non-active' };

        const event = await Event.findByPk(eventId);
        if (!event) {
            return handleResponse(res, 404, { message: 'Event not found' });
        }

        await Event.update(newStatus, { where: { id: eventId } });
        return handleResponse(res, 200, { message: 'Event status updated successfully' });
    }catch(error){
        console.log(error);
        return handleServerError(res, error);
    }
}

exports.deleteMyEvent = async(req, res) => {
    try{

        const { eventId } = req.params
        const userId = req.id;
        console.log(req.params, "ini params")
        console.log(eventId, "event id")
        console.log(userId, "<<user id")

        const eventToDelete = await Event.findOne({ where: { id: eventId, userId: userId } });
        console.log(eventToDelete)
        if (!eventToDelete) {
            return res.status(404).json({ message: "Event not found or you're not authorized to delete this event" });
        }

        await eventToDelete.destroy()
        return res.status(200).json({ message: 'Event successfully deleted.' });
    }catch(error){
        console.log(error)
        return handleServerError(res, error)
    }
}