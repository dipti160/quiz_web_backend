const express = require("express");
const router = express.Router();
const registerUserMiddleware = require("../middleware/user");

const { createUser } = require("../controller/user");

router.post("/register", registerUserMiddleware, createUser);

module.exports = router;
