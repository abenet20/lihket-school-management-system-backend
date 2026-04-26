const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../middleware/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const verfyToken = require("../middleware/verifyToken");
const addMark = require("../controllers/teacher/addMark");
const saveAttendance = require("../controllers/teacher/saveAttendance");
const addAssessment = require("../controllers/teacher/addAssessment");
const editMark = require("../controllers/teacher/editMark");
const uploadTools = require("../controllers/teacher/uploadTools");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
  },
});

const fileUpload = multer({ storage });

router.post("/upload-tool", verfyToken, uploadTools);
router.post("/add-mark", verfyToken, addMark);
router.post("/add-assessment", verfyToken, addAssessment);
router.post("/save-attendance", verfyToken, saveAttendance);
router.post("/edit-mark", verfyToken, editMark);

module.exports = router;
