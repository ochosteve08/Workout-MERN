const { UserModel } = require("../model/");
const { verifyToken } = require("../utils/jwtTokens");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }
  const token = authorization.split(" ")[1];
   
  try {
    // Print the generated JWT secret
    const decoded = await verifyToken(token);
    const { _id } = decoded;
   
    req.user = await UserModel.findOne({ _id }).select("_id");
    console.log("req.user:",req.user)
    next();
  } catch (error) {
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
