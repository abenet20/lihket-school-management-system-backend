const Attendance = require("../../models/attendance");
const Student = require("../../models/students");
const Tardy = require("../../models/tardy");

const attendance = async (req, res) => {
    try{

        let totalAttendance = [];
        let totalTardy = [];    


         const present = await attendance.findAll({
            where: {
                status: 'present',
                date: new Date()
            }
        });

        const absent = await attendance.findAll({
            where: {
                status: 'absent',
                date: new Date()
            }
        });

        const tardies = await tardy.findAll({
            where: {
                status: 'late',
                date: new Date()
            }
        });

        const students = await Student.findAll();
        for(const student of students){ 
            const {id, name, grade, section} = student;
            const attendance = await Attendance.findAll({
                where: {
                    studentId: id
                }
            });
            const tardy = await Tardy.findAll({
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

            totalTardy.push({
                name,
                grade,
                section,
                tardy
            });

             };
            res.status(201).json({success: true, overview: {present, absent, tardy: tardies}, attendance: totalAttendance, tardt: totalTardy});
    }catch(error){
        res.status(500).json({message: "Server error",error: error.message});
    }
};

module.exports = attendance;