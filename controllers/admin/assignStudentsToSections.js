const { where } = require('sequelize');
const Section = require('../../models/sections');
const Student = require('../../models/students');

async function createSections({count ,names = null, baseName = 'Section', capacity = Infinity , gradeLevel}) {
  if (names && !Array.isArray(names)) throw new Error('names must be an array or null')
  const sectionNames = names || Array.from({ length: count }, (_, i) => `${baseName}${i + 1}`)
  const capacities = Array.isArray(capacity)
    ? capacity
    : Array(sectionNames.length).fill(capacity)
  if (capacities.length !== sectionNames.length) {
    throw new Error('capacity array length must match number of section names')
  }
  
  const createdSections = await Promise.all(
    sectionNames.map((name, i) =>
      Section.create({
        name,
        gradeLevel,
        capacity: capacities[i]
      })
    )
  );

  return createdSections;

}

const assignStudentsToSections = async (req, res) => {
try{
    const {count, gradeLevel, options} = req.body;

    const checkExistingSections = await Section.findAll({where: {gradeLevel}});
    if (checkExistingSections.length > 0) {
      // If sections already exist, return them
      return res.status(200).json({ success: true, message: "Sections already exist", sections: checkExistingSections });
    }

    const sections = await createSections({count, gradeLevel});//to get sections list createad

  const { balanceCGPA = false } = options;
  const studentSectionMap = {};
  const sectionStudentMap = {};
  
  let students = await Student.findAll({
    attributes: ["id","name","lastYearAverage"],
     where: {
      grade: gradeLevel
     }
    }) || [];

  // Sort students by CGPA if balancing is enabled
  if (balanceCGPA && students.length > 0 && students[0].lastYearAverage !== undefined) {
    students.sort((a, b) => (b.lastYearAverage || 0) - (a.lastYearAverage || 0));
  } else {
    // Random shuffle for fair distribution
    students = [...students].sort(() => Math.random() - 0.5);
  }
  
  // Calculate target capacity per section
  const totalStudents = students.length;
  const numSections = sections.length;
  const baseCapacity = Math.floor(totalStudents / numSections);
  const remainder = totalStudents % numSections;
  
  // Initialize section counters
  sections.forEach( async (section, idx) => {
    section.currentCount = 0;
    section.targetCapacity = baseCapacity + (idx < remainder ? 1 : 0);
  });
  
  // Assign students round-robin to balance sections
  let sectionIdx = 0;
  for (const student of students) {
    const section = sections[sectionIdx];
    
    // Check capacity constraint
    if (section.currentCount >= section.capacity) {
      throw new Error(`Section ${section.section_id} exceeded capacity`);
    }
    
    studentSectionMap[student.id] = {
      student_name: student.name,
      section_id: section.id,
      section_name: section.name,
      lastYearAverage: student.lastYearAverage
    };

    Student.update({section: section.id}, {where: {id: student.id}});
    
    section.currentCount++;
    
    // Move to next section
    sectionIdx = (sectionIdx + 1) % numSections;
  }

  // Map sections to their assigned students
  sections.forEach(section => {
    sectionStudentMap[section.name] = Object.keys(studentSectionMap).filter(studentId => studentSectionMap[studentId].section_id === section.id).map(studentId => ({
      student_id: studentId,
      student_name: studentSectionMap[studentId].student_name,
      lastYearAverage: studentSectionMap[studentId].lastYearAverage
    }));
  });

  res.status(201).json({success: true, message: "sections assigned successfully", sectionStudentMap, sections})
}catch(error){
    res.status(500).json({message: "unable to assign", error: error.message});
}
}

// console.log(createSections({count: 3, gradeLevel: 9}));
module.exports = assignStudentsToSections;
