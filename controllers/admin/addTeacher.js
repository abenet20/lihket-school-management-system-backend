const Teacher = require("../../models/teachers");
const User = require("../../models/users");
const generator = require("generate-password");
const bcrypt = require("bcrypt");

const addTeacher = async (req, res) => {
    const { name, email, phone, subject, qualification, hireDate, status} = req.body;

    try{
function generateUsername(name = "user") {
      const cleaned = name.toLowerCase().replace(/\s+/g, "").split(" ")[0];
      const random = Math.floor(1000 + Math.random() * 9000); 
      return `${cleaned}${random}`;
    }
        
                let teacherPassword = generator.generate({
                length: 8,
                numbers: true,
                symbols: false,
                uppercase: false,
                lowercase: true,
              });
              const teacherPasswordHash = await bcrypt.hash(teacherPassword, 10);

        const newUser = await User.create({
            name,
            email,
            username: generateUsername(name),
            password: teacherPasswordHash,
            role: "teacher"
        },
    { fields: ["name", "email", "username", "password", "role"] }
    );

        const newTeacher =  await Teacher.create({
            name,
            email,
            phone,
            subject,
            qualification,
            hireDate,
            status,
            userId: newUser.id
        },
    { fields: ["name", "email", "phone", "subject", "qualification", "hireDate", "status", "userId"] }
    ); 
    
        newTeacher.username = newUser.username;
        newTeacher.password = teacherPassword;
        res.status(201).json({message: `Teacher added successfully`, teacher: newTeacher});
    }catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
};

module.exports = addTeacher;