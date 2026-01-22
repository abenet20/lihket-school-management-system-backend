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


const uploadPath = "C:/Users/hp/Documents/github/lihket-school-management-system/uploads";   

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
router.post("/add-teacher", verfyToken ,addTeacher);
router.post("/attendance", verfyToken ,attendance);
router.get("/announcement", verfyToken ,announcement);
router.post("/add-announcement", verfyToken ,addAnnouncement);
router.delete("/delete-announcement/:announcementId", verfyToken ,deleteAnnouncement);
router.get("/dashboard", verfyToken ,dashboard);
router.get("/students", verfyToken ,getAllStudents);
router.get("/student/:id", verfyToken , getStudentById);

module.exports = router;