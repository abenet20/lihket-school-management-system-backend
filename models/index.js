const Student = require("./students");
const Attendance = require("./attendance");
const Section = require("./sections");

// associations
Student.hasMany(Attendance, {
  foreignKey: "studentId",
  as: "attendances"
});

Attendance.belongsTo(Student, {
  foreignKey: "studentId",
  as: "student"
});
