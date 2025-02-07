import { StudentFormComponent } from './components/student_form.js';

document.addEventListener("DOMContentLoaded", function index() {
    // Build Student Form
    buildStudentForm();

    // Display all Student
    renderAllStudent();

    const studentForm = document.forms["student-form"];
    const updateBtns = document.querySelectorAll(".update-btn");
    const deleteBtns = document.querySelectorAll(".delete-btn");

    studentForm.addEventListener("submit", (event) => addStudent(event, studentForm));

    updateBtns.forEach(
        (updateBtn) => {
            updateBtn.addEventListener("click", () => updateStudentCb(updateBtn));
        })

    deleteBtns.forEach(
        (deleteBtn) => {
            deleteBtn.addEventListener("click", () => deleteStudentCb(deleteBtn));
        }
    )
})

function buildStudentForm() {
    const studentFormComponent = document.getElementsByTagName('studentformcomponent')[0];
    studentFormComponent.innerHTML = StudentFormComponent();
}

function renderAllStudent() {
    // Render all students from local storage
    const localStudents = JSON.parse(localStorage.getItem('students'));

    const studentsRow = document.getElementById('students-row');
    let count = 1;

    for (let student in localStudents) {
        studentsRow.append(studentRow(count, localStudents[student]));
        count++;
    }
}

function getAverageScore(student) {
    const mathScore = parseInt(student.math_score);
    const englishScore = parseInt(student.english_score);
    const literatureScore = parseInt(student.literature_score);

    return (mathScore + englishScore + literatureScore) / 3;
}

function studentRow(count, student) {
    // Create a student row for each student info
    const tr = document.createElement('tr');

    const studentKey = `student_${count}`;

    const studentRowId = `row-${studentKey}`;
    tr.setAttribute('id', studentRowId);

    const stt = document.createElement('td');
    stt.innerHTML = count;
    tr.append(stt);

    for (let prop in student) {
        const td = document.createElement('td');
        td.className = 'student-field';
        td.dataset.fieldName = prop;
        td.innerHTML = student[prop];
        tr.append(td);
    }

    const average = document.createElement('td');
    average.innerHTML = getAverageScore(student);
    tr.append(average);

    const action = document.createElement('td');
    action.innerHTML = `
    <button type="button" class="btn btn-success update-btn" data-update-student="${studentKey}">Update</button>
    <button type="button" class="btn btn-danger delete-btn" data-delete-student="${studentKey}">Delete</button>
    `;
    tr.append(action);

    return tr;
}

function addStudent(event, studentForm) {
    // Add a new student form the form

    // Prevent the from from submiting
    event.preventDefault();

    const students = document.getElementById('students-row');

    // Get all student info
    const studentFormInputs = studentForm.querySelectorAll("input");

    // Get all students in the local storage
    let localStudents = JSON.parse(localStorage.getItem('students'));
    let studentCount;

    if (!localStudents) {
        studentCount = 0;
        localStudents = {};
    }
    else {
        // Get the current amount of students
        studentCount = Object.keys(localStudents).length;
    }

    const nextStudentKey = `student_${studentCount + 1}`;

    const newStudent = {};

    studentFormInputs.forEach((input) => {
        if (input.name == 'gender') {
            if (input.checked) {
                newStudent['gender'] = input.value;
            }
        }
        else {
            newStudent[input.name] = input.value;
        }
    })

    localStudents[nextStudentKey] = newStudent;

    localStorage.setItem('students', JSON.stringify(localStudents));
    
    // Append new student row
    students.append(studentRow(studentCount + 1, newStudent));

    // Add new Event Listener for new update Student btn
    const newUpdateStudentBtn = document.getElementsByClassName('update-btn')[studentCount];
    newUpdateStudentBtn.addEventListener("click", () => updateStudentCb(newUpdateStudentBtn));

    // Add new Event Listener for new delete Student btn
    const newDelStudentBtn = document.getElementsByClassName('delete-btn')[studentCount];
    newDelStudentBtn.addEventListener("click", () => deleteStudentCb(newDelStudentBtn));
}

function updateStudentCb(updateBtn) {
    const studentForm = document.forms["student-form"];

    // / Get student id from data attribute
    const studentKey = updateBtn.dataset.updateStudent;

    // Get current Student info
    const currentStudentInfo = getStudentInfo(studentKey);
    const studentInfo = currentStudentInfo[studentKey];

    // Build update Student Form
    updateStudentForm(studentInfo, studentForm);

    const updateStudentBtn = document.getElementById('update-student-btn');
    const cancelBtn = document.getElementById('cancel-btn');

    updateStudentBtn.addEventListener("click", updateStudent);
    cancelBtn.addEventListener("click", buildStudentForm);
}

function getStudentInfo(studentKey) {
    // Implement try catch blocl later
    const localStudents = JSON.parse(localStorage.getItem("students"));

    const studentInfo = {};
    studentInfo[studentKey] = localStudents[studentKey];
    
    return studentInfo;
}

function updateStudentForm(studentInfo, studentForm) {
    // Rebuild the Student Form
    const studentFormTitle = document.getElementById('student-form-title');
    studentFormTitle.innerHTML = `Thay đổi thông tin học sinh: ${studentInfo['name']}`;

    const studentFormInputs = studentForm.querySelectorAll("input");

    studentFormInputs.forEach(
        (input) => {
            if (input.name == 'gender') {
                if (input.value == studentInfo['gender']) {
                    input.checked = true;
                }
            }
            else {
                input.value = studentInfo[input.name];
            }
        }
    )

    const addStudentBtn = document.getElementById('add-student-btn');
    addStudentBtn.style.display = 'none';
    const updateBtns = document.getElementById('update-btns');
    updateBtns.style.display = 'block';
}

function updateStudentRow(studentKey, student) {
    const studentRowId = `row-${studentKey}`;
    const studentRow = document.getElementById(studentRowId);

    const fields = studentRow.querySelectorAll('.student-field');
    fields.forEach(
        (field) => {
            field.innerHTML = student[field.dataset.fieldName];
        }
    )
}

function updateStudent(event) {
    const btn = event.target;
    const studentKey = btn.dataset.updateStudent;
    console.log("Updating...", studentKey);
    
    const localStudents = JSON.parse(localStorage.getItem('students'));
    const student = localStudents[studentKey];

    const studentForm = document.forms['student-form'];
    const studentInputs = studentForm.querySelectorAll('input');
    studentInputs.forEach(
        (input) => {
            if (input.name == 'gender') {
                if (input.checked) {
                    student['gender'] = input.value;
                }
            }
            else {
                student[input.name] = input.value;
            }
        }
    )
    
    // Update student to Local Storage
    localStorage.setItem('students', JSON.stringify(localStudents));

    // Update student row in the table
    updateStudentRow(studentKey, student);
}

function deleteStudentCb(deleteBtn) {
    const studentKey = deleteBtn.dataset.deleteStudent;
    console.log("Deleting student:", studentKey);
    const student = getStudentInfo(studentKey);
    localStorage.setItem('delete-student', JSON.stringify(student));

    const students = JSON.parse(localStorage.getItem('students'));

    // Delete the student in the local storage
    delete students[studentKey];
    localStorage.setItem('students', JSON.stringify(students));

    // Rerender the table
    renderAllStudent();

    const deleteStudent = JSON.parse(localStorage.getItem('delete-student'));
    console.log("Delete:", deleteStudent);
}