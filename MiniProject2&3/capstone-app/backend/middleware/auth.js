// middleware/auth.js
const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  // Grab token from the Authorization header
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(403).json({ message: "Access denied, no token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token." });
    }

   req.user = decoded;  // Ensure user info is added to request
  req.userId = decoded.userId || decoded.id; // Ensure userId is extracted correctly

    //console.log("Decoded Token:", decoded);  // Debugging
   // console.log("User ID assigned to req:", req.userId);

    next(); // Allow the request to proceed
  });
};

module.exports = authenticateJWT;