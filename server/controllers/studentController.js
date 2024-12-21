const { Student, Mark } = require("../models");

// Create Student
exports.createStudent = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const student = await Student.create({ name, email, age });
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Students (with pagination)
exports.getStudents = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const students = await Student.findAndCountAll({
      limit,
      offset,
      include: [{ model: Mark }],
    });

    res.json({
      total: students.count,
      page,
      limit,
      data: students.rows,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Single Student with Marks
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id, {
      include: [{ model: Mark }],
    });

    if (!student) return res.status(404).json({ message: "Student not found" });

    res.json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update Student
exports.updateStudent = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const student = await Student.update(
      { name, email, age },
      { where: { id: req.params.id } }
    );

    if (!student) return res.status(404).json({ message: "Student not found" });

    res.json({ message: "Student updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Student
exports.deleteStudent = async (req, res) => {
  try {
    await Student.destroy({ where: { id: req.params.id } });
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
