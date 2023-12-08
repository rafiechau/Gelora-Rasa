const { handleNotFound, handleSuccess } = require("../helper/handleResponseHelper");
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