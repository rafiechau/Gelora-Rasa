const { verifyTokenVerifyEmail } = require("../utils/jwt")

exports.verifyEmailMiddleware = async(req, res, next) => {
    const { token } = req.body
    console.log(token)
    if(!token) return res.sendStatus(403)
    const { email, otp } = verifyTokenVerifyEmail(token)
    req.email = email
    req.otpJWT = otp
    next();
}