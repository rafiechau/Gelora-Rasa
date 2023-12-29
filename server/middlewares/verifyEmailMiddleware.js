const { verifyTokenVerifyEmail } = require("../utils/jwt")

exports.verifyEmailMiddleware = async(req, res, next) => {
    const { token } = req.body
    if(!token) return res.sendStatus(403)
    const verificationResult = verifyTokenVerifyEmail(token)

    if (verificationResult.expired) {
        return res.status(401).json({ message: "OTP expired" });
    }

    if (verificationResult.error) {
        return res.status(500).json({ message: verificationResult.error });
    }
    req.email = verificationResult.email;
    req.otpJWT = verificationResult.otp;
    next();
}