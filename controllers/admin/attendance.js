const Attendance = require("../../models/attendance");
const Student = require("../../models/students");

const attendance = async (req, res) => {
    try{
        let totalAttendance = [];
        const students = await Student.findAll();
        for(const student of students){ 
            const {id, name, grade, section} = student;
            const attendance = await Attendance.findAll({
                where: {
                    studentId: id
                }
            });

            totalAttendance.push({
                name,
                grade,
                section,
                attendance
            });

             };
            res.status(201).json({success: true, totalAttendance});
    }catch(error){
        res.status(500).json({message: "Server error",error: error.message});
    }
};

module.exports = attendance;