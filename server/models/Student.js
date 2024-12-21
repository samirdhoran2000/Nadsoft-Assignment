const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Student = sequelize.define(
  "Student",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    age: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    timestamps: true,
  }
);

module.exports = Student;
