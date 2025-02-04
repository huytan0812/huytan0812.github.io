import { StudentFormComponent } from './components/student_form.js';

document.addEventListener("DOMContentLoaded", function index() {
    // Build Student Form
    buildStudentForm();

    // Display all Student
    renderAllStudent();

    const studentForm = document.forms["student-form"];
    const updateBtns = document.querySelectorAll(".update-btn");
    const deleteBtns = document.getElementsByClassName("delete-btn");

    const addStudentBtn = document.getElementById('add-student-btn');

    studentForm.addEventListener("submit", (event) => addStudent(event, studentForm));

    updateBtns.forEach(
        (updateBtn) => {
            updateBtn.addEventListener("click", () => updateStudentCb(updateBtn));
        })
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

    const stt = document.createElement('td');
    stt.innerHTML = count;
    tr.append(stt);

    for (let prop in student) {
        const td = document.createElement('td');
        td.innerHTML = student[prop];
        tr.append(td);
    }

    const average = document.createElement('td');
    average.innerHTML = getAverageScore(student);
    tr.append(average);

    const action = document.createElement('td');
    action.innerHTML = `
    <button type="button" class="btn btn-success update-btn" data-update-student="${count}">Update</button>
    <button type="button" class="btn btn-danger delete-btn" data-delete-student"${count}">Delete</button>
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
    const localStudents = JSON.parse(localStorage.getItem('students'));

    // Get the current amount of students
    const studentCount = Object.keys(localStudents).length;
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
}

function updateStudentCb(updateBtn) {
    const studentForm = document.forms["student-form"];

    // / Get student id from data attribute
    const studentId = parseInt(updateBtn.dataset.updateStudent);

    // Get current Student info
    const currentStudentInfo = getStudentInfo(studentId);
    const studentKey = Object.keys(currentStudentInfo)[0];
    const studentInfo = currentStudentInfo[studentKey];

    // Build update Student Form
    updateStudentForm(studentInfo, studentForm);

    const updateStudentBtn = document.getElementById('update-student-btn');
    const cancelBtn = document.getElementById('cancel-btn');

    updateStudentBtn.dataset.studentKey = studentKey;
    updateStudentBtn.addEventListener("click", testRemoving);
    cancelBtn.addEventListener("click", buildStudentForm);
}

function getStudentInfo(studentId) {
    const localStudents = JSON.parse(localStorage.getItem("students"));

    const studentKey = `student_${studentId}`;
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

function testRemoving(event) {
    const btn = event.target;
    const studentKey = btn.dataset.studentKey;
    console.log("Updating...", studentKey);
    return event;
}

function updateStudentLS(studentKey) {
    console.log("Update Student to LS", studentKey);
    const studentInfo = document.forms['student-form'];
    const inputs = studentInfo.querySelectorAll('input');
}