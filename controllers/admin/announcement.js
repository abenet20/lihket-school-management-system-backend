const { where } = require('sequelize');
const Announcement = require('../../models/announcements');

const announcement = async (req, res) => {
    try {
        const announcements = await Announcement.findAll();
        res.status(200).json({message: "Announcements retrieved successfully", announcements});
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
};

const addAnnouncement = async (req, res) => {
   const {userId, title, body, target, status} = req.body;

   try {
       const newAnnouncement = await Announcement.create({
           title,
           body,
           target,
           status,
           postedBy: userId
       },
       { fields: ["title", "body", "target", "status", "postedBy"] }
       );
       res.status(201).json({message: "Announcement added successfully", announcement: newAnnouncement});
   } catch (error) {
       res.status(500).json({message: "Server error", error: error.message});
   }
};

const deleteAnnouncement = async (req, res) => {
    const {announcementId} = req.params;
    try{
      const deletedAnnouncement = await Announcement.destroy({
            where: {
                id: announcementId
            }
        });
        res.status(200).json({message: "Announcement deleted successfully"});
    }catch(error){
        res.status(500).json({message: "Server error", error: error.message});
    }
};

module.exports = { announcement, addAnnouncement, deleteAnnouncement };