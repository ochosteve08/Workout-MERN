const { UserModel } = require("../model/");
const { verifyToken } = require("../utils/jwtTokens");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }
  const token = authorization.split(" ")[1];
  console.log("token:",token);
 
  try {
    // Print the generated JWT secret
    const decoded = await verifyToken(token);
    console.log(JSON.stringify(decoded));
    console.log(decoded);
    const { _id } = decoded;
    console.log(_id)

    req.user = await UserModel.findOne({ _id }).select("_id");
    console.log("req.user:",req.user)
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
