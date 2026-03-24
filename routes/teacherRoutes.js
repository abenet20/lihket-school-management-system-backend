const express = require("express");
const router = express.Router();
const multer = require("multer");
const verfyToken = require("../middleware/verifyToken");
const addMark = require("../controllers/teacher/addMark");
const saveAttendance = require("../controllers/teacher/saveAttendance");
const addAssessment = require("../controllers/teacher/addAssessment");
const editMark = require("../controllers/teacher/editMark");
const uploadTools = require("../controllers/teacher/uploadTools.ts");


const uploadPath = "uploads/tools/";   

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const fileUpload = multer({ storage });

router.post("/upload-tool", verfyToken, uploadTools);
router.post("/add-mark", verfyToken ,addMark);
router.post("/add-assessment", verfyToken ,addAssessment);
router.post("/save-attendance", verfyToken, saveAttendance);
router.post("/edit-mark", verfyToken, editMark);

module.exports = router;