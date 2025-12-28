const express = require("express");
const router = express.Router();
// const multer = require("multer");
const verfyToken = require("../middleware/verifyToken");
const addStudent = require("../controllers/admin/addStudent");
const addTeacher = require("../controllers/admin/addTeacher");
const attendance = require("../controllers/admin/attendance");


// const uploadPath = "C:/Users/hp/Documents/github/lihket-school-management-system/uploads";   

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   }
// });

// const fileUpload = multer({ storage });
// , fileUpload.single("studentPhoto")

router.post("/add-student", verfyToken ,addStudent);
router.post("/add-teacher", verfyToken ,addTeacher);
router.post("/attendance", verfyToken ,attendance);

module.exports = router;