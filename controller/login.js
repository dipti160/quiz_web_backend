const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authenticateUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Email is not find" });
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      "quiz_web_coyote",
      {
        expiresIn: "2m", // Token expires in 1 hour
      }
    );

    const data = {
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role,
    };
    res.json({ token, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { authenticateUser };
