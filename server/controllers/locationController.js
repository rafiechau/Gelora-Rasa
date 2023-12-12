const { handleNotFound, handleSuccess, handleServerError, handleCreated, handleResponse } = require("../helper/handleResponseHelper");
const { validateJoi, schemaLocation } = require("../helper/joiHelper");
const { Location } = require("../models");

exports.getAllLocation = async (req, res) => {
    try{
        const location = await Location.findAll({
            order: [['namaProvinsi', 'ASC']]
        })

        if (location.length === 0) {
            return handleNotFound(res)
        }

        return handleSuccess(res, { message: "success retrieved Location from database", data: location  });
    }catch(error){
        console.log(error)
        return handleServerError(res, error)
    }
}

exports.createLocation = async (req, res) => {
    try{
        const newLocation = req.body;
      
        const { error, handleRes } = validateJoi(res, newLocation, schemaLocation);
        if (error) {
          return handleRes;
        }
  
        const isExist = await Location.findOne({ where: { namaProvinsi: newLocation.namaProvinsi }})

        if (isExist) {
            return handleResponse(res, 400, {
              message: "Nama Provinsi already existed",
            });
        }
      
        const location = await Location.create(newLocation);
  
        return handleSuccess(res, {
            data: location,
            message: `success created location : ${location.namaProvinsi}`,
        });
    }catch(error){
        console.log(error)
        return handleServerError(res, error)
    }
}

exports.updateLocation = async(req, res) => {
    try{
        const { locationId } = req.params
        const updateDataLocation = req.body

        const { error, handleRes } = validateJoi(res, updateDataLocation, schemaLocation)
        if(error){
            return handleRes;
        }

        const currentLocation = await Location.findOne({ where: { id: locationId }})
        if(!currentLocation){
            return handleResponse(res, 404, { message: 'Location not found' })
        }

        await Location.update(updateDataLocation, { where: {id: locationId} })
        return handleCreated(res, { message: "success update data location" });
    }catch(error){
        console.log(error)
        return handleServerError(res, error)
    }
}

exports.deleteLocation = async(req, res) => {
    try{
        const { locationId } = req.params
        console.log(locationId)

        const locationDelete = await Location.findOne({ where: { id: locationId } });
        if (!locationDelete) {
            return res.status(404).json({ message: "location not found" });
        }

        await locationDelete.destroy()
        return res.status(200).json({ message: 'location successfully deleted.' });
    }catch(error){
        console.log(error)
        return handleServerError(res, error)
    }
}