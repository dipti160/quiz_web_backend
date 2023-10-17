const User = require("../../models/user");

// Create a new user
const createUser = async (req, res) => {
  try {
    const filteredData = Object.fromEntries(
      Object.entries(req.body).filter(
        ([key, value]) => value !== "" || key == "confirmPassword"
      )
    );
    delete filteredData.confirmPassword;
    await User.create(req.body);
    res.status(201).json("success");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createUser,
  // getUsers,
  // getUserById,
  // updateUserById,
  // deleteUserById,
};
