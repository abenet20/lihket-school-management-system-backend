const Mark = require('../../models/marks');
const Assessment = require('../../models/assessments');
const database = require("../../config/database");

const addMark = async (req, res) => {
    const { assessmentId, studentsMarkData } = req.body;

    // Basic payload validation
    if (!assessmentId || !Array.isArray(studentsMarkData) || studentsMarkData.length === 0) {
        return res.status(400).json({ message: 'assessmentId and non-empty studentsMarkData are required' });
    }

    const t = await database.transaction();

    try {
        // Re-fetch assessment inside the transaction
        const assessment = await Assessment.findByPk(assessmentId, { transaction: t });
        if (!assessment) {
            await t.rollback();
            return res.status(404).json({ message: 'Assessment not found' });
        }

        // Check if assessment is active
        if (assessment.status !== 'draft') {
            await t.rollback();
            return res.status(400).json({ message: 'Cannot add marks to submitted assessment. Please try to edit it instead.' });
        }

        // Validate scores do not exceed assessment.maxScore
        const tooHigh = studentsMarkData.filter(m => Number(m.scoreObtained) > Number(assessment.maxScore));
        if (tooHigh.length > 0) {
            await t.rollback();
            return res.status(400).json({
                message: 'One or more scores exceed the assessment maxScore',
                students: tooHigh.map(s => ({ studentId: s.studentId, scoreObtained: s.scoreObtained }))
            });
        }

        // Prepare list of unique studentIds to check for existing marks
        const studentIds = [...new Set(studentsMarkData.map(m => m.studentId))];

        // Check for existing marks for these students for the same assessment within the transaction
        const existing = await Mark.findAll({
            where: {
                assessmentId,
                studentId: studentIds
            },
            transaction: t
        });

        if (existing.length > 0) {
            await t.rollback();
            return res.status(400).json({
                message: 'Marks already exist for some students for this assessment',
                studentIds: existing.map(e => e.studentId)
            });
        }


        // Build records and bulk insert inside the same transaction
        const records = studentsMarkData.map(m => ({
            studentId: m.studentId,
            assessmentId,
            scoreObtained: m.scoreObtained
        }));

        await Mark.bulkCreate(records, {
            updateOnDuplicate: ['scoreObtained', 'updatedAt'],
            fields: ['studentId', 'assessmentId', 'scoreObtained'],
            transaction: t
        });

        await t.commit();
        return res.status(201).json({ message: 'Marks added successfully' });
    } catch (error) {
        await t.rollback();
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = addMark;
    