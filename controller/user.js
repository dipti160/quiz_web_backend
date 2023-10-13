const User = require("../models/user");

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

// Get all users
const getUsers = async (req, res) => {
  try {
    // Logic to retrieve all users
    // Example:
    // const users = await User.findAll();
    // res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    // Logic to retrieve a user by ID
    // Example:
    // const user = await User.findByPk(userId);
    // if (!user) {
    //   return res.status(404).json({ error: 'User not found' });
    // }
    // res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update user by ID
const updateUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    // Logic to update a user by ID
    // Example:
    // const [updatedRowsCount, updatedUser] = await User.update(req.body, {
    //   where: { id: userId },
    //   returning: true,
    // });
    // if (updatedRowsCount === 0) {
    //   return res.status(404).json({ error: 'User not found' });
    // }
    // res.status(200).json(updatedUser[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete user by ID
const deleteUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    // Logic to delete a user by ID
    // Example:
    // const deletedRowCount = await User.destroy({
    //   where: { id: userId },
    // });
    // if (deletedRowCount === 0) {
    //   return res.status(404).json({ error: 'User not found' });
    // }
    // res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
