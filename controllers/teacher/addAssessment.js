const Assessment = require('../../models/assessments');

const addAssessment = async (req, res) => {
    const { subjectId, maxScore, assessmentType, date } = req.body;

    try {
        const newAssessment = await Assessment.create({
            subjectId,
            maxScore,
            assessmentType,
            date
        });
        res.status(201).json({success: true, message: "assessment added successfully", assessment: newAssessment});
    } catch (error) {
        console.error("Error adding assessment:", error);
        res.status(500).json({ success: false, message: "Failed to add assessment" });
    }
};

module.exports = addAssessment;