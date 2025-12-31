const { where } = require('sequelize');
const Announcement = require('../../models/announcements');

const addAnnouncement = async (req, res) => {
   const {userId, title, body, status} = req.body;

   try {
       const newAnnouncement = await Announcement.create({
           title,
           body,
           status,
           postedBy: userId
       },
       { fields: ["title", "body", "status", "postedBy"] }
       );
       res.status(201).json({message: "Announcement added successfully", announcement: newAnnouncement});
   } catch (error) {
       res.status(500).json({message: "Server error", error: error.message});
   }
};

const deleteAnnouncement = async (req, res) => {
    const {announcementId} = req.params;
    try{
      const deletedAnnouncement = await Announcement.delete({
            where: {
                id: announcementId
            }
        });
        res.status(200).json({message: "Announcement deleted successfully"});
    }catch(error){
        res.status(500).json({message: "Server error", error: error.message});
    }
};

module.exports = { addAnnouncement, deleteAnnouncement };