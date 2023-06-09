const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;


// Middleware for verifying JWT tokens
function verifyToken(req, res, next) {
  // Get the token from the Authorization header
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Verify the token and extract the payload
  try {
    const payload = jwt.verify(token, secretKey);
    req.user = payload;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = verifyToken;
