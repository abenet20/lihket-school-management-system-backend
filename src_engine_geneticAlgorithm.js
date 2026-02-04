/**
 * COMPLETE GENETIC ALGORITHM IMPLEMENTATION FOR TIMETABLE GENERATION
 * Phases 2-10 as per specification
 */

// ============================================================================
// PHASE 2: SECTION ASSIGNMENT (RESTARTABLE)
// ============================================================================

/**
 * Assign students to sections with balancing
 * @param {Array} students - All students for a subject
 * @param {Array} sections - Available sections
 * @param {Object} options - { balanceCGPA: boolean }
 * @returns {Object} - { studentSectionMap, sections }
 */
export function assignStudentsToSections(students, sections, options = {}) {
  const { balanceCGPA = false } = options;
  const studentSectionMap = {};
  
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
  sections.forEach((section, idx) => {
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
    
    studentSectionMap[student.student_id] = {
      section_id: section.section_id,
      section_code: section.section_code
    };
    
    section.currentCount++;
    
    // Move to next section
    sectionIdx = (sectionIdx + 1) % numSections;
  }
  
  return { studentSectionMap, sections };
}