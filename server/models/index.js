const Student = require("./Student");
const Mark = require("./Mark");

// Associations
Student.hasMany(Mark, { foreignKey: "student_id" });
Mark.belongsTo(Student, { foreignKey: "student_id" });

module.exports = { Student, Mark };
