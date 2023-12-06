const { verifyTokenForForgetPassword } = require("../utils/jwt");

exports.verifySendResetMiddleware = async (req, res, next) => {
    const { token } = req.body;
    if (!token) return res.sendStatus(403);
    const { email } = verifyTokenForForgetPassword(token);
    req.email = email;
    next();
};