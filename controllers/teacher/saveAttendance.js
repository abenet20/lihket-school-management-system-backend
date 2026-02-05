const Attendance = require("../../models/attendance");

const saveAttendance = async (req, res) => {
    const {teacherId ,studentsList} = req.body;
    const date = new Date().toISOString().slice(0, 10);
    try{
        studentsList.forEach(async (student) => {
            const {studentId, status} = student;
            const check = await Attendance.findOne({ studentId, date });
            if (check) {
                // If attendance record exists, update it
                await Attendance.updateOne({ studentId, date }, { status, updatedBy: teacherId });
            } else {
                // If attendance record does not exist, create it
                await Attendance.create({
                    studentId,
                    date,
                    status,
                    createdBy: teacherId
                });
            }
        });

        res.status(201).json({ message: 'Attendance added successfully' });
    }catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = saveAttendance;