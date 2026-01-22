const annoucement = require('../../models/announcements');
const student = require('../../models/students');
const teacher = require('../../models/teachers');
const attendance = require('../../models/attendance');
const section = require('../../models/sections');
const tardy = require('../../models/tardy');

const getDashboardStats = async (req, res) => {
    try {
        const present = await annoucement.findAll({
            where: {
                status: 'present',
                date: new Date()
            }
        });

        const absent = await annoucement.findAll({
            where: {
                status: 'absent',
                date: new Date()
            }
        });

        const totalStudents = await student.count();
        const totalTeachers = await teacher.count();
        const totalSections = await section.count();
        const totalTardies = await tardy.count();

        res.status(200).json({success: true, data: {
            totals: {
            students: totalStudents,
            tteachers: totalTeachers,
            classes: totalSections,
            },
            attendanceToday:{
            present: present.length,
            absent: absent.length,
            tardy: totalTardies
            },
            examsThisTerm: {},
            results:{
                published: 0,
                unpublished: 0
            }
        }});
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
}

module.exports = getDashboardStats;