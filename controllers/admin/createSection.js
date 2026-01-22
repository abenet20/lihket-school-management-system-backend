const Section = require('../../models/sections');
const Student = require('../../models/students');

// const createSections = async (req, res) => {
//     const { gradeLevel, totalNumberOfRooms } = req.body;
const createSections = async (gradeLevel, totalNumberOfRooms) => {

    try {
        const newSections = [];
        const students = await Student.count({
            where: { grade: gradeLevel }
        });
        const totalSections = Math.ceil(students / totalNumberOfRooms);

        for (let i = 1; i <= totalSections; i++) {
            const sectionName = `Section ${i}`;
            const newSection = await Section.create({
                name: sectionName,
                gradeLevel: gradeLevel
            });
            newSections.push(newSection);
        }

        const studentsList = await Student.findAll({
            where: { grade: gradeLevel }
        });
        const females = studentsList.filter(student => student.gender === 'female');
        const males = studentsList.filter(student => student.gender === 'male');
        let femalesAverageLow = [];
        let femalesAverageMedium = [];
        let femalesAverageHigh = [];
        let malesAverageLow = [];
        let malesAverageMedium = [];
        let malesAverageHigh = [];

        for (const female of females) {
            const lastYearAverage = female.lastYearAverage || 0;
            if (lastYearAverage < 60) {
                femalesAverageLow.push(female);
            } else if (60 <= lastYearAverage && lastYearAverage <= 80) {
                femalesAverageMedium.push(female);
            } else if (lastYearAverage >= 80) {
                femalesAverageHigh.push(female);
            }
        }


        for (const male of males) {
            const lastYearAverage = male.lastYearAverage || 0;
            if (lastYearAverage < 60) {
                // console.log(male);
                malesAverageLow.push(male);
            } else if (60 <= lastYearAverage && lastYearAverage <= 80) {
                // console.log(male);
                malesAverageMedium.push(male);
            } else if (lastYearAverage >= 80) {
                // console.log(male);
                malesAverageHigh.push(male);
            }
        }

        newSections.forEach((section, index) => {
            section.assignedStudents = [];
            let capacity = totalNumberOfRooms;

            if (index < femalesAverageLow.length) {
                section.assignedStudents.push(...femalesAverageLow.slice(index * capacity, (index + 1) * capacity));
            }
            if (index < femalesAverageMedium.length) {
                section.assignedStudents.push(...femalesAverageMedium.slice(index * capacity, (index + 1) * capacity));
            }
            if (index < femalesAverageHigh.length) {
                section.assignedStudents.push(...femalesAverageHigh.slice(index * capacity, (index + 1) * capacity));
            }
            if (index < malesAverageLow.length) {
                section.assignedStudents.push(...malesAverageLow.slice(index * capacity, (index + 1) * capacity));
            }
            if (index < malesAverageMedium.length) {
                section.assignedStudents.push(...malesAverageMedium.slice(index * capacity, (index + 1) * capacity));
            }
            if (index < malesAverageHigh.length) {
                console.log(malesAverageHigh);
                section.assignedStudents.push(...malesAverageHigh.slice(index * capacity, (index + 1) * capacity));
            }
            console.log(JSON.stringify(section.assignedStudents));
        });

        // res.status(201).json({
        //     message: "Sections created successfully",
        //     sections: newSections
        // });
        // console.log("Sections created successfully", JSON.stringify(newSections));
    } catch (error) {
        console.error("Error creating sections:", error);
        // res.status(500).json({ error: "Failed to create sections" });
    }
};

createSections('12', 3);

// module.exports = createSections;