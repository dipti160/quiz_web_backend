const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserCourse = require("../models/user_course");
const UserDepartment = require("../models/user_department");

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

    let data = {
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role,
    };

    if (user.role === "instructor" || user.role === "student") {
      const resData = await User.findByPk(user.id, {
        include: [
          {
            model: UserCourse,
            attributes: ["user_id", "course_id"],
          },
          {
            model: UserDepartment,
            attributes: ["department_id", "user_id"],
          },
        ],
      });

      if (!resData) {
        console.log("Error in user, user_course or user_department");
      }
      data = {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role,
        usercourse: resData?.UserCourses,
        UserDepartment: resData?.UserDepartments,
      };
    }

    res.json({ token, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { authenticateUser };
