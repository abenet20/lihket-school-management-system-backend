const Attendance = require("../../models/attendance");
const Student = require("../../models/students");
const Section = require("../../models/sections");

const getAllStudents = async (req, res) => {
   try{
         const students = await Student.findAll({attributes: ["id","name", "grade", "section","age","status","phone","email"],
             include: [{model: Attendance, as: 'attendances', attributes: ["id", "date", "status"]}]
            });
            const studentData = await Promise.all(students.map(async student => {
                const json = student.toJSON();
                const attendances = json.attendances || [];
                const totalRecords = attendances.length;
                const presentCount = attendances.filter(a => a.status === 'present').length;
                const absentCount = attendances.filter(a => a.status === 'absent').length;
                const lateCount = attendances.filter(a => a.status === 'late').length;

                const attendancePercentage = totalRecords ? Number(((presentCount / totalRecords) * 100).toFixed(2)) : 0;
                const latePercentage = totalRecords ? Number(((lateCount / totalRecords) * 100).toFixed(2)) : 0;

                return {
                    ...json,
                    section: await Section.findByPk(student.section, {attributes: ["id", "name"]}),
                    attendanceSummary: {
                        totalRecords,
                        presentCount,
                        absentCount,
                        lateCount,
                        latePercentage,
                        attendancePercentage
                    }
                };
            }));
            res.status(200).json({message: "Students fetched successfully", students: studentData});

   }catch(error){
        res.status(500).json({message: "Server error", error: error.message});
    }
};

const getStudentById = async (req, res) => {
    const studentId = req.params.id;
    try{
        const student = await Student.findByPk(studentId, {attributes: ["id","name", "grade", "section","age","status","phone","email"], include: [{model: Attendance, as: 'attendances', attributes: ["id", "date", "status"]}]});
          if(student){
              res.status(200).json({message: "Student fetched successfully", student});
            } else {
                res.status(404).json({message: "Student not found"});
            }

    }catch(error){
         res.status(500).json({message: "Server error", error: error.message});
    }
};

module.exports = { getAllStudents, getStudentById };