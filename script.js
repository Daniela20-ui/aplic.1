const LS_KEYS = {
  students: 'edu_students_v1',
  subjects: 'edu_subjects_v1',
  grades: 'edu_grades_v1'
};

const $ = id => document.getElementById(id);
const read = key => JSON.parse(localStorage.getItem(key) || '[]');
const write = (key, val) => localStorage.setItem(key, JSON.stringify(val));

function seedIfEmpty() {
  if (read(LS_KEYS.students).length === 0) {
    write(LS_KEYS.students, [{ id: 1, name: 'Alumno Ejemplo', dni: '00000000' }]);
  }
  if (read(LS_KEYS.subjects).length === 0) {
    write(LS_KEYS.subjects, [{ id: 1, name: 'Matemáticas' }, { id: 2, name: 'Lengua' }]);
  }
}
seedIfEmpty();

// --- Renderizado de datos ---
function populateStudentSelect() {
  const sel = $('gradeStudent');
  sel.innerHTML = '';
  read(LS_KEYS.students).forEach(s => {
    const opt = document.createElement('option');
    opt.value = s.id;
    opt.textContent = `${s.name} — ${s.dni}`;
    sel.appendChild(opt);
  });
}

function populateSubjectSelect() {
  const sel = $('gradeSubject');
  sel.innerHTML = '';
  read(LS_KEYS.subjects).forEach(s => {
    const opt = document.createElement('option');
    opt.value = s.id;
    opt.textContent = s.name;
    sel.appendChild(opt);
  });
}

function renderStudents() {
  const tbody = $('studentsTable').querySelector('tbody');
  const students = read(LS_KEYS.students);
  tbody.innerHTML = '';
  students.forEach((s, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td>${s.name}</td>
      <td>${s.dni}</td>
      <td class="actions">
        <button class="btn-ghost" onclick="editStudent(${s.id})">Editar</button>
        <button onclick="deleteStudent(${s.id})">Eliminar</button>
      </td>`;
    tbody.appendChild(tr);
  });
  populateStudentSelect();
}

function renderSubjects() {
  const tbody = $('subjectsTable').querySelector('tbody');
  const subs = read(LS_KEYS.subjects);
  tbody.innerHTML = '';
  subs.forEach((s, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td>${s.name}</td>
      <td class="actions">
        <button class="btn-ghost" onclick="editSubject(${s.id})">Editar</button>
        <button onclick="deleteSubject(${s.id})">Eliminar</button>
      </td>`;
    tbody.appendChild(tr);
  });
  populateSubjectSelect();
}

function renderGrades() {
  const tbody = $('gradesTable').querySelector('tbody');
  const grades = read(LS_KEYS.grades);
  const students = read(LS_KEYS.students);
  const subjects = read(LS_KEYS.subjects);
  tbody.innerHTML = '';
  grades.forEach((g, idx) => {
    const student = students.find(s => s.id === g.studentId) || { name: '-' };
    const subject = subjects.find(s => s.id === g.subjectId) || { name: '-' };
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td>${student.name}</td>
      <td>${subject.name}</td>
      <td>${g.value}</td>
      <td class="actions">
        <button class="btn-ghost" onclick="editGrade(${g.id})">Editar</button>
        <button onclick="deleteGrade(${g.id})">Eliminar</button>
      </td>`;
    tbody.appendChild(tr);
  });
}

// --- CRUD Estudiantes ---
let editingStudentId = null;
$('studentForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = $('studentName').value.trim();
  const dni = $('studentDNI').value.trim();
  if (!name || !dni) return alert('Completa nombre y DNI');
  const students = read(LS_KEYS.students);
  if (editingStudentId) {
    const idx = students.findIndex(s => s.id === editingStudentId);
    students[idx].name = name;
    students[idx].dni = dni;
    editingStudentId = null;
  } else {
    students.push({ id: Date.now(), name, dni });
  }
  write(LS_KEYS.students, students);
  $('studentForm').reset();
  renderStudents();
  renderGrades();
});

$('studentClear').addEventListener('click', () => {
  $('studentForm').reset();
  editingStudentId = null;
});

window.editStudent = id => {
  const s = read(LS_KEYS.students).find(x => x.id === id);
  if (!s) return;
  $('studentName').value = s.name;
  $('studentDNI').value = s.dni;
  editingStudentId = id;
};

window.deleteStudent = id => {
  if (!confirm('Eliminar estudiante?')) return;
  let students = read(LS_KEYS.students).filter(s => s.id !== id);
  write(LS_KEYS.students, students);
  let grades = read(LS_KEYS.grades).filter(g => g.studentId !== id);
  write(LS_KEYS.grades, grades);
  renderStudents();
  renderGrades();
};

// --- CRUD Asignaturas ---
let editingSubjectId = null;
$('subjectForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = $('subjectName').value.trim();
  if (!name) return alert('Completa el nombre de la asignatura');
  const subs = read(LS_KEYS.subjects);
  if (editingSubjectId) {
    const idx = subs.findIndex(s => s.id === editingSubjectId);
    subs[idx].name = name;
    editingSubjectId = null;
  } else {
    subs.push({ id: Date.now(), name });
  }
  write(LS_KEYS.subjects, subs);
  $('subjectForm').reset();
  renderSubjects();
  renderGrades();
});

$('subjectClear').addEventListener('click', () => {
  $('subjectForm').reset();
  editingSubjectId = null;
});

window.editSubject = id => {
  const s = read(LS_KEYS.subjects).find(x => x.id === id);
  if (!s) return;
  $('subjectName').value = s.name;
  editingSubjectId = id;
};

window.deleteSubject = id => {
  if (!confirm('Eliminar asignatura?')) return;
  let subs = read(LS_KEYS.subjects).filter(s => s.id !== id);
  write(LS_KEYS.subjects, subs);
  let grades = read(LS_KEYS.grades).filter(g => g.subjectId !== id);
  write(LS_KEYS.grades, grades);
  renderSubjects();
  renderGrades();
};

// --- CRUD Notas ---
let editingGradeId = null;
$('gradeForm').addEventListener('submit', e => {
  e.preventDefault();
  const studentId = Number($('gradeStudent').value);
  const subjectId = Number($('gradeSubject').value);
  const value = Number($('gradeValue').value);
  if (isNaN(value)) return alert('Ingresa una nota válida');
  const grades = read(LS_KEYS.grades);
  if (editingGradeId) {
    const idx = grades.findIndex(g => g.id === editingGradeId);
    grades[idx] = { ...grades[idx], studentId, subjectId, value };
    editingGradeId = null;
  } else {
    grades.push({ id: Date.now(), studentId, subjectId, value });
  }
  write(LS_KEYS.grades, grades);
  $('gradeForm').reset();
  renderGrades();
});

$('gradeClear').addEventListener('click', () => {
  $('gradeForm').reset();
  editingGradeId = null;
});

window.editGrade = id => {
  const g = read(LS_KEYS.grades).find(x => x.id === id);
  if (!g) return;
  $('gradeStudent').value = g.studentId;
  $('gradeSubject').value = g.subjectId;
  $('gradeValue').value = g.value;
  editingGradeId = id;
};

window.deleteGrade = id => {
  if (!confirm('Eliminar nota?')) return;
  let grades = read(LS_KEYS.grades).filter(g => g.id !== id);
  write(LS_KEYS.grades, grades);
  renderGrades();
};

function init() {
  renderStudents();
  renderSubjects();
  renderGrades();
}
init();
