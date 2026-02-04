// Simple module to create sections and assign students
// Usage:
// const { createSections, assignStudents } = require('./sections')
// const sections = createSections({ count: 3, baseName: 'A', capacity: 10 })
// const result = assignStudents(studentsArray, sections, 'balanced')

/**
 * Create section objects.
 * Options:
 * - count: number of sections to create
 * - names: optional array of names (overrides count)
 * - baseName: if names not provided, sections named `${baseName}${i+1}` (default 'Section')
 * - capacity: number or array of capacities (if single number, applied to all)
 */
function createSections({ count = 1, names = null, baseName = 'Section', capacity = Infinity } = {}) {
  if (names && !Array.isArray(names)) throw new Error('names must be an array or null')
  const sectionNames = names || Array.from({ length: count }, (_, i) => `${baseName}${i + 1}`)
  const capacities = Array.isArray(capacity)
    ? capacity
    : Array(sectionNames.length).fill(capacity)
  if (capacities.length !== sectionNames.length) {
    throw new Error('capacity array length must match number of section names')
  }
  const sections = sectionNames.map((name, i) => ({
    id: `${name}`,
    name,
    capacity: capacities[i],
    students: []
  }))
  return sections
}

/**
 * assignStudents(students, sections, strategy)
 * - students: array of student objects or IDs (e.g. { id, name } or string)
 * - sections: array produced by createSections
 * - strategy: 'roundRobin' | 'balanced' | 'random' | 'fillFirst'
 *
 * Returns a new array of sections with students assigned. Does not mutate input sections.
 */
function assignStudents(students = [], sections = [], strategy = 'balanced') {
  // Make a deep-ish copy of sections so we don't mutate caller's array
  const out = sections.map(s => ({ ...s, students: [...(s.students || [])] }))

  // Helper: can add student to a section if capacity not exceeded
  const tryAdd = (section, student) => {
    if ((section.students.length || 0) < (section.capacity || Infinity)) {
      section.students.push(student)
      return true
    }
    return false
  }

  if (!Array.isArray(students) || !Array.isArray(sections)) {
    throw new Error('students and sections must be arrays')
  }

  if (strategy === 'roundRobin') {
    let idx = 0
    for (const student of students) {
      // find next section that has capacity (search at most sections.length times)
      let attempts = 0
      while (attempts < out.length) {
        const sec = out[idx % out.length]
        idx += 1
        attempts += 1
        if (tryAdd(sec, student)) break
      }
      // if no section had room, student remains unassigned (skip)
    }
  } else if (strategy === 'random') {
    const randInt = (n) => Math.floor(Math.random() * n)
    for (const student of students) {
      // shuffle candidate indices quickly via sampling attempts
      let placed = false
      const tries = Math.min(out.length, 10)
      for (let t = 0; t < tries; t++) {
        const idx = randInt(out.length)
        if (tryAdd(out[idx], student)) {
          placed = true
          break
        }
      }
      if (!placed) {
        // last resort try all
        for (const sec of out) {
          if (tryAdd(sec, student)) {
            placed = true
            break
          }
        }
      }
    }
  } else if (strategy === 'fillFirst') {
    // fill sections in order until capacity, then next
    let secIdx = 0
    for (const student of students) {
      while (secIdx < out.length && out[secIdx].students.length >= out[secIdx].capacity) {
        secIdx += 1
      }
      if (secIdx >= out.length) break // no room left
      out[secIdx].students.push(student)
    }
  } else { // 'balanced' default
    // Always put next student into the section with the fewest students that still has capacity.
    for (const student of students) {
      // compute eligible sections
      const eligible = out.filter(s => (s.students.length || 0) < (s.capacity || Infinity))
      if (eligible.length === 0) break
      eligible.sort((a, b) => a.students.length - b.students.length)
      tryAdd(eligible[0], student)
    }
  }

  return out
}

// module.exports = { createSections, assignStudents }
console.log(createSections({count: 3}));