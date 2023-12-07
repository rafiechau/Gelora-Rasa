
const { User } = require("../models");
const { verifyToken } = require("../utils/jwt");

exports.authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(403);
  const token = authHeader.replace("Bearer ", "");
  const { id, role, fullName, error } = verifyToken(token);
  // console.log(id)
  if (error) {
    return res.sendStatus(401);
  }
  const isExist = await User.findOne({ where: { id: id } });
  if (!isExist || isExist.role != role) {
    return res.sendStatus(401);
  }
  req.id = id;
  req.fullName = fullName;
  req.role = role;
  next();
};
