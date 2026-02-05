const Mark = require('../../models/marks');
const Assessment = require('../../models/assessments');

const addMark = async (req, res) => {
    const { assessmentId, studentsMarkData } = req.body;

    const assessment = await Assessment.findByPk(assessmentId);

    try {
        studentsMarkData.forEach(async (markData) => {
            const { studentId, scoreObtained } = markData;
            if (scoreObtained > assessment.maxScore) {
                res.status(400).json({ message: `Score for student ${studentId} exceeds maximum score for the assessment` });
            }
            await Mark.create({
                studentId,
                assessmentId,
                scoreObtained
            }, { fields: ['studentId', 'assessmentId', 'scoreObtained'] }
        );
        });

        res.status(201).json({ message: 'Marks added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = addMark;
    