const Assessment = require('../../models/assessments');
const Mark = require('../../models/marks');

const editMark = async (req, res) => {
    const { assessmentId, studentMarkData } = req.body;
    const {studentId, name, scoreObtained} = studentMarkData;

     if (!assessmentId || !studentId || scoreObtained === undefined) {
        return res.status(400).json({ message: 'assessmentId, studentId and scoreObtained are required' });
    }

    try {
        // Re-fetch assessment inside the transaction
        const assessment = await Assessment.findByPk(assessmentId);
        if (!assessment) {
            await t.rollback();
            return res.status(404).json({ message: 'Assessment not found' });
        }

        // Check if assessment is active
        if (assessment.status === 'approved') {
            await t.rollback();
            return res.status(400).json({ message: 'Cannot edit marks for approved assessment.' });
        }

        // Validate scores do not exceed assessment.maxScore
        const tooHigh = Number(scoreObtained) > Number(assessment.maxScore);
        if (tooHigh) {
            return res.status(400).json({
                message: 'Score exceeds the assessment maxScore',
                name,
                studentId,
                scoreObtained,
                maxScore: assessment.maxScore
            });
        }

        await Mark.update({ scoreObtained, updatedAt: new Date() }, {
            where: {
                assessmentId,
                studentId
            }
        });

        return res.status(200).json({ message: 'Marks updated successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = editMark;
