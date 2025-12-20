const express = require("express");
const router = express.Router();
const verfyToken = require("../middleware/verifyToken");
const addStudent = require("../controllers/admin/addStudent");

router.post("/add-student", addStudent);

module.exports = router;