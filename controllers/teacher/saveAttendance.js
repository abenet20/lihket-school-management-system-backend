const Attendance = require("../../models/attendance");

const saveAttendance = async (req, res) => {
    const {teacherId, date ,studentsList} = req.body;
    try{
        studentsList.forEach(async (student) => {
            const {studentId, status} = student;
            await Attendance.create({
                studentId,
                date,
                status,
                createdBy: teacherId
            });
        });

        res.status(201).json({ message: 'Attendance added successfully' });
    }catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = saveAttendance;