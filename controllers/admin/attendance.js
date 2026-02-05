const Attendance = require("../../models/attendance");
const Student = require("../../models/students");
const Section = require("../../models/sections");

const attendance = async (req, res) => {
    try{

        let totalAttendance = [];  
        let totalTardy = [];   
        const today = new Date().toISOString().slice(0, 10);

         const present = await Attendance.findAll({
            where: {
                status: 'present',
                date: today
            }
        });

        const absent = await Attendance.findAll({
            where: {
                status: 'absent',
                date: today
            }
        });

        const late = await Attendance.findAll({
            where: {
                status: 'late',
                date: today
        }
        });

        const studentRecords = await Student.findAll();
        const students = await Promise.all(studentRecords.map(async student => ({
            id: student.id,
            name: student.name,
            grade: student.grade,
            section: await Section.findByPk(student.section, {attributes: ["id", "name"]}),
        })));

        for(const student of students){ 
            const {id, name, grade, section} = student;
            const attendance = await Attendance.findAll({
                where: {
                    studentId: id
                },
                 attributes: ["id", "date", "status"],
        });

            const tardy = attendance.filter(record => record.status === 'late');

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
        res.status(201).json({success: true, overview: {present: present.length, absent: absent.length, tardy: late.length}, attendance: totalAttendance, tardy: totalTardy});
    }catch(error){
        res.status(500).json({message: "Server error",error: error.message});
    }
};

module.exports = attendance;