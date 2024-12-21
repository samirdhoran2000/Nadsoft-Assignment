const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Mark = sequelize.define(
  "Mark",
  {
    student_id: { type: DataTypes.INTEGER, allowNull: false },
    subject: { type: DataTypes.STRING, allowNull: false },
    mark: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    timestamps: true,
  }
);

module.exports = Mark;
