const Student = require("./students");
const Attendance = require("./attendance");

// associations
Student.hasMany(Attendance, {
  foreignKey: "studentId",
  as: "attendances"
});

Attendance.belongsTo(Student, {
  foreignKey: "studentId",
  as: "student"
});
