const { Sequelize } = require("sequelize");
const Department = require("../../models/department");

// create a new department
const createDepartment = async (req, res) => {
  try {
    const { name } = req.body;
    const department = await Department.create({ name });
    res.status(201).json(department);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// list of all departments
const listDepartments = async (req, res) => {
  try {
    const { page, limit, search } = req.query;

    const offset = (page - 1) * limit;
    let whereCondition = {};
    if (search) {
      whereCondition = { name: { [Sequelize.Op.like]: `%${search}%` } };
    }

    const departments = await Department.findAll({
      where: whereCondition,
      offset: offset,
      limit: parseInt(limit),
      order: [["createdAt", "DESC"]],
    });
    const totalDepartments = await Department.count({
      where: whereCondition,
    });
    const totalPages = Math.ceil(totalDepartments / limit);

    res.status(200).json({ data: departments, totalPages: totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// get all departments
const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll();

    res.status(200).json(departments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// get department by id
const departmentId = async (req, res) => {
  const departmentId = req.params.id;
  try {
    const department = await Department.findByPk(departmentId);
    if (department) {
      res.status(200).json(department);
    } else {
      res.status(404).json({ error: "Department not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// update department by id
const updateDepartment = async (req, res) => {
  const departmentId = req.params.id;
  try {
    const updatedRowsCount = await Department.update(req.body, {
      where: { id: departmentId },
    });

    console.log(updatedRowsCount, "updatedRowsCount");
    if (updatedRowsCount > 0) {
      res.status(200).json({ message: "success" });
    } else {
      res.status(404).json({ error: "Department not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//   delete department

const deleteDepartment = async (req, res) => {
  const departmentId = req.params.id;
  try {
    const deletedRowCount = await Department.destroy({
      where: { id: departmentId },
    });
    if (deletedRowCount > 0) {
      res.status(200).json({ message: "success" });
    } else {
      res.status(404).json({ error: "Department not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createDepartment,
  listDepartments,
  getAllDepartments,
  deleteDepartment,
  departmentId,
  updateDepartment,
};
