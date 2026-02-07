const express = require("express");
const router = express.Router();
const multer = require("multer");
const verfyToken = require("../middleware/verifyToken");
const addStudent = require("../controllers/admin/addStudent");
const addTeacher = require("../controllers/admin/addTeacher");
const attendance = require("../controllers/admin/attendance");
const {announcement, addAnnouncement, deleteAnnouncement} = require("../controllers/admin/announcement")
const dashboard = require("../controllers/admin/dashboard");
const {getAllStudents, getStudentById } = require("../controllers/admin/students");
const assignStudentsToSections = require("../controllers/admin/assignStudentsToSections");
const addSubject = require("../controllers/admin/addSubject");


const uploadPath = "uploads/users-pictures/";   

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const fileUpload = multer({ storage });


router.post("/add-student", verfyToken, fileUpload.single("studentPhoto") ,addStudent);
router.post("/add-teacher", verfyToken, fileUpload.single("teacherPhoto") ,addTeacher);
router.get("/attendance", verfyToken ,attendance);
router.get("/announcement", verfyToken ,announcement);
router.post("/add-announcement", verfyToken ,addAnnouncement);
router.delete("/delete-announcement/:announcementId", verfyToken ,deleteAnnouncement);
router.get("/dashboard", verfyToken ,dashboard);
router.get("/students", verfyToken ,getAllStudents);
router.get("/students/:id", verfyToken , getStudentById);
router.post("/create-assign-sections", verfyToken, assignStudentsToSections);
router.post("/add-subject", verfyToken, addSubject);

module.exports = router;