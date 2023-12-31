const jwt = require('jsonwebtoken');

exports.createTokenVerifyEmail = (otp, email) => {
    if (!otp || !email) {
      return false;
    }
    return jwt.sign({ otp, email }, process.env.SECRET_KEY_VERIFY_EMAIL, { expiresIn: "2m" });
};

exports.createToken = (user) => {
  const { role, id, firstName } = user;
  if (!role || !id || !firstName ) {
    return false;
  }
  return jwt.sign({ id, role, firstName }, process.env.SECRET_KEY);
};

exports.verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (decoded) return decoded;
    if (err) return { error: true };
  });
};

exports.createTokenForForgetPassword = (email) => {
  if (!email) {
    return false;
  }
  return jwt.sign({ email }, process.env.SECRET_KEY_FOR_FORGET_PASSWORD, { expiresIn: "10m" });
};

exports.verifyTokenForForgetPassword = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY_FOR_FORGET_PASSWORD, {
    expiresIn: 2 * 60 * 1000,
  });
};

exports.verifyTokenVerifyEmail = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET_KEY_VERIFY_EMAIL);
  } catch (error) {
      if (error.name === 'TokenExpiredError') {
          return { expired: true };
      }
      return { error: error.message };
  }
};