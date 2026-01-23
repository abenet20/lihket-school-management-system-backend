const Attendance = require("../../models/attendance");
const Student = require("../../models/students");

const getAllStudents = async (req, res) => {
   try{
         const students = await Student.findAll({});
         res.status(200).json({message: "Students fetched successfully", students});

   }
    catch(error){
        res.status(500).json({message: "Server error", error: error.message});
    }
};

const getStudentById = async (req, res) => {
    const {studentId} = req.params;
    try{
        const student = await Student.findByPk(studentId, {include: Attendance});
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