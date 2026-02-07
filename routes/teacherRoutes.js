const express = require("express");
const router = express.Router();
const verfyToken = require("../middleware/verifyToken");
const addMark = require("../controllers/teacher/addMark");
const saveAttendance = require("../controllers/teacher/saveAttendance");
const addAssessment = require("../controllers/teacher/addAssessment");
const editMark = require("../controllers/teacher/editMark");

router.post("/add-mark", verfyToken ,addMark);
router.post("/add-assessment", verfyToken ,addAssessment);
router.post("/save-attendance", verfyToken, saveAttendance);
router.post("/edit-mark", verfyToken, editMark);

module.exports = router;