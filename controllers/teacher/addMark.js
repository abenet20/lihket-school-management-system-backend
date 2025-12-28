const Mark = require('../../models/marks');

const addMark = async (req, res) => {
    const { teacherId, studentsMarkData } = req.body;
    const userId = req.user.id; 

    try {
        studentsMarkData.forEach(async (markData) => {
            const { studentId, subject, outOf, scored } = markData;
            await Mark.create({
                studentId,
                subject,
                outOf,
                scored,
                teacherId: teacherId,
            }, { fields: ['studentId', 'subject', 'outOf', 'scored', 'teacherId'] }
        );
        });

        res.status(201).json({ message: 'Marks added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = addMark;
    