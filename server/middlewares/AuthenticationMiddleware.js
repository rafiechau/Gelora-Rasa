
const { User } = require("../models");
const { verifyToken } = require("../utils/jwt");

exports.authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(403);
  const token = authHeader.replace("Bearer ", "");
  const { id, role, firstName, error } = verifyToken(token);
  // console.log(id)
  if (error) {
    return res.status(401).json({ message: "Token invalid: " + error.message });
  }
  const isExist = await User.findOne({ where: { id: id } });
  if (!isExist || isExist.role != role) {
    return res.status(401).json({ message: "User not found or role mismatch" });
  }
  req.id = id;
  req.firstName = firstName;
  req.role = role;
  next();
};
