const express = require("express");
const {
  createMark,
  getMarksByStudentId,
  updateMark,
  deleteMark,
} = require("../controllers/markController");

const router = express.Router();

router.post("/marks", createMark);

router.get("/marks/student/:student_id", getMarksByStudentId);

router.put("/marks/:id", updateMark);

router.delete("/marks/:id", deleteMark);

module.exports = router;
