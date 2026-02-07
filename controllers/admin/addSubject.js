const Subject = require('../../models/subjects');

const addSubject = async (req, res) => {
    const { name, grade ,teacherId } = req.body;

    try {
        const newSubject = await Subject.create({
            name,
            grade,
            teacherId
        });
        res.status(201).json({ success: true, message: "Subject added successfully", subject: newSubject });
    } catch (error) {
        console.error("Error adding subject:", error);
        res.status(500).json({ success: false, message: "Failed to add subject" });
    }
};

module.exports = addSubject;