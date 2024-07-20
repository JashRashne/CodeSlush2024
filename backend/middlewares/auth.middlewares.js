const jwt = require("jsonwebtoken");
const Warden = require("../models/warden.models.js"); // Adjust path as needed
const getUserModel = require("../utils/getUserModel.js");

const verifyJWT = async (req, res, next) => {
  try {
    console.log(req.cookies?.accessToken);
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).send("Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("Decoded token:", decodedToken);

    const UserModel = getUserModel(decodedToken.role);
    const user = await UserModel.findById(decodedToken?.id);
    console.log("User:", user);

    if (!user) {
      return res.status(401).send("Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(401).send(error?.message || "Invalid Access Token");
  }
};

module.exports = verifyJWT;
