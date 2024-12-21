const { Mark, Student } = require("../models");

exports.createMark = async (req, res) => {
  try {
    const { student_id, subject, mark } = req.body;

    const student = await Student.findByPk(student_id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const newMark = await Mark.create({ student_id, subject, mark });
    res.status(201).json(newMark);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMarksByStudentId = async (req, res) => {
  try {
    const { student_id } = req.params;

    const student = await Student.findByPk(student_id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const marks = await Mark.findAll({ where: { student_id } });
    res.json(marks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateMark = async (req, res) => {
  try {
    const { id } = req.params;
    const { subject, mark } = req.body;

    const existingMark = await Mark.findByPk(id);
    if (!existingMark) {
      return res.status(404).json({ message: "Mark not found" });
    }

    await existingMark.update({ subject, mark });
    res.json({ message: "Mark updated successfully", mark: existingMark });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteMark = async (req, res) => {
  try {
    const { id } = req.params;

    const mark = await Mark.findByPk(id);
    if (!mark) {
      return res.status(404).json({ message: "Mark not found" });
    }

    await mark.destroy();
    res.json({ message: "Mark deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
