const { handleResponse } = require("../helper/handleResponseHelper");

exports.authorizationRoleEventOrganizer = async (req, res, next) => {
    const { role } = req;
    if (role != 2) {
      return handleResponse(res, 403, {
        message:
          "unauthorize, forbidden access this endpoint login with event organizer account",
      });
    }
    next();
};
  
exports.authorizationRoleStandardUser = async (req, res, next) => {
    const { role } = req;
    if (role != 1) {
      return handleResponse(res, 403, {
        message:
          "unauthorize, forbidden access this endpoint login with standard account",
      });
    }
    next();
};

exports.authorizationRoleAdmin = async (req, res, next) => {
    const { role } = req
    if(role != 3 ){
        return handleResponse(res, 403, {
            message: "unauthorize, forbidden access this endpoint login with admin account"
        })
    } 
    next();
}