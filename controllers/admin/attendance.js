const Attendance = require("../../models/attendance");
const Student = require("../../models/students");
const Tardy = require("../../models/tardy");

const attendance = async (req, res) => {
    try{

        let totalAttendance = [];
        let totalTardy = [];    


         const present = await Attendance.findAll({
            where: {
                status: 'present',
                date: new Date()
            }
        });

        const absent = await Attendance.findAll({
            where: {
                status: 'absent',
                date: new Date()
            }
        });

        const tardies = await Tardy.findAll({
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
                attendance: {id: attendance.id, date: attendance.date, status: attendance.status}
            });

            totalTardy.push({
                name,
                grade,
                section,
                tardy: {id: tardy.id, date: tardy.date, status: tardy.status}
            });

             };
            res.status(201).json({success: true, overview: {present: present.length, absent: absent.length, tardy: tardies.length}, attendance: totalAttendance, tardt: totalTardy});
    }catch(error){
        res.status(500).json({message: "Server error",error: error.message});
    }
};

module.exports = attendance;