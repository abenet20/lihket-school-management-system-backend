const uploadTool = require('../../models/uploadedTools');

const uploadTools = async (req, res) => {
    try {
        const { title, description, deadline , subject, type } = req.body;
        const filePath = req.file ? req.file.path : null;

        if (!title || !description || !deadline || !subject || !type) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newTool = await uploadTool.updateOrCreate({
            where: {  
                title,
                description,
                deadline,
                subject,
                type,
                filePath
            },
            defaults: {
                title,
                description,
                deadline,
                subject,
                type,
                filePath
            }
        });

        return res.status(201).json({ message: 'Tool uploaded successfully', tool: newTool });
    } catch (error) {
        console.error('Error uploading tool:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = uploadTools;
