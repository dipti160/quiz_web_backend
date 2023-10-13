const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  // Get the token from the request headers
  const token = req.header("Authorization");

  // Check if the token is present
  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, "quiz_web_coyote"); // replace 'your_secret_key' with your actual secret key

    // Add the user information to the request object for further use in the route handlers
    req.user = decoded;
    next(); // Move to the next middleware or route handler
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

module.exports = verifyToken;
