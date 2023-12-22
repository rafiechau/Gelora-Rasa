const { DetailEventOrganizer, User } = require("../models");
const { handleResponse, handleServerError, handleSuccess, handleCreated } = require("../helper/handleResponseHelper");
const { validateJoi, schemaOrder, schemaEventOrganizer } = require("../helper/joiHelper");
const { createToken } = require("../utils/jwt");


exports.createEventOrganizer = async (req, res) => {
    try{
        const newEventOtganizer = req.body
        // console.log("Mengecek keberadaan Event Organizer dengan NIK:", newEventOtganizer.nik);
        const userId = req.id;
        const { error, handleRes } = validateJoi(res, newEventOtganizer, schemaEventOrganizer);
        if (error) {
          return handleRes;
        }

        const isExist = await DetailEventOrganizer.findOne({ where: { nik: newEventOtganizer.nik }})

        if (isExist) {
            return handleResponse(res, 400, {
              message: "Event Organizer already existed",
            });
        }

        const eventOrganizerData = {
            ...newEventOtganizer,
            userId: userId 
        };

        const eventOrganizer = await DetailEventOrganizer.create(eventOrganizerData);

        await User.update({ role: 2 }, {
            where: { id: userId }
        })

        const findUpdateUser = await User.findOne({ where: {id: userId} })
        const token = createToken(findUpdateUser)
        if (!token) {
            throw new Error("Token Created failed");
        }
  
        return handleSuccess(res, {
            token: token,
            message: `success created event organizer : ${eventOrganizer.namaLengkap}`,
        });
    }catch(error){
        console.log(error)
        return handleServerError(res, error)
    }
}