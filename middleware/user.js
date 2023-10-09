const User = require("../models/user");
const bcrypt = require("bcrypt");

const registerUserMiddleware = async (req, res, next) => {
  try {
    const { firstname, email, password } = req.body;

    if (!firstname || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = registerUserMiddleware;
