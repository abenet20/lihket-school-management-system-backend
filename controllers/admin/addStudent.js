const student = require("../../models/students");
const user = require("../../models/users");
const generator = require("generate-password");
const bcrypt = require("bcrypt");

const addStudent = async (req, res) => {
    const {name,age,gender,grade,phone,email,lastYearAverage} = req.body;
    const photoPath = req.body.path;

    try {
    function generateUsername(name = "user") {
      const cleaned = name.toLowerCase().replace(/\s+/g, "").split(" ")[0];
      const random = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
      return `${cleaned}${random}`;
    }

        let studentPassword = generator.generate({
        length: 8,
        numbers: true,
        symbols: false,
        uppercase: false,
        lowercase: true,
      });
      const studentPasswordHash = await bcrypt.hash(studentPassword, 10);

      const username = generateUsername(name);

        const newUser = await user.create({
            username: username,
            password:   studentPasswordHash,
            name: name,
            email: email,
            role: "student"
        },
    { fields: ["username", "password", "name", "email", "role"] }
    );
        const newStudent = await student.create({
            name,
            age,
            gender,
            grade,
            phone,
            email,
            userId: newUser.id,
            lastYearAverage
        },
    { fields: ["name", "age", "gender", "grade", "phone", "email", "userId","lastYearAverage"] }
    );
    newStudent.username = username;
    newStudent.password = studentPassword; 

        res.status(201).json({message: `Student added successfully`, student: newStudent});
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
};

module.exports = addStudent;
