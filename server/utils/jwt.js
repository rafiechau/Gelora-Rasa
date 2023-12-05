const jwt = require('jsonwebtoken');

exports.createTokenVerifyEmail = (otp, email) => {
    if (!otp || !email) {
      return false;
    }
    return jwt.sign({ otp, email }, process.env.SECRET_KEY_VERIFY_EMAIL, { expiresIn: "2m" });
};

exports.verifyTokenVerifyEmail = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY_VERIFY_EMAIL);
};