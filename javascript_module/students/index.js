import { StudentFormComponent } from './components/student_form.js';
import { StudentTableComponent, studentRow, getAverageScore} from './components/student_table_component.js';

document.addEventListener("DOMContentLoaded", function index() {
    // Build Student Form
    buildStudentForm();

    // Display all Student
    buildStudentTable();

    const studentForm = document.forms["student-form"];
    studentForm.addEventListener("submit", (event) => addStudent(event, studentForm));

    const prevBtn = document.getElementById('prev-btn');

    const pageBtns = document.querySelectorAll('.page-btn');
    pageBtns.forEach(
        (pageBtn) => pageBtn.addEventListener("click", () => {
            buildStudentTable(pageBtn.dataset.page);
        })
    )

    const nextBtn = document.getElementById('next-btn');

})

function buildStudentForm() {
    const studentFormComponent = document.getElementsByTagName('studentformcomponent')[0];
    studentFormComponent.innerHTML = StudentFormComponent();
}

function buildStudentTable(page) {
    const studentTableComponent = document.getElementsByTagName('studenttablecomponent')[0];
    studentTableComponent.innerHTML = '';
    studentTableComponent.appendChild(StudentTableComponent(page));
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
    let studentPK;

    if (!localStudents) {
        studentPK = 0;
        studentCount = 0;
        localStudents = {};
    }
    else {
        // Get the current PK
        studentPK = JSON.parse(localStorage.getItem('studentPK'));

        // Get the current amount of students
        studentCount = Object.keys(localStudents).length;
    }

    studentPK += 1;
    const nextStudentKey = `student_${studentPK}`;

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
    localStorage.setItem('studentPK', JSON.stringify(studentPK));
    
    // Append new student row
    students.append(studentRow(studentCount + 1, nextStudentKey, newStudent));

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

    updateStudentBtn.dataset.studentKey = studentKey;
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

    const averageScore = studentRow.getElementsByClassName('average-score')[0];
    averageScore.innerHTML = getAverageScore(student);
}

function updateStudent(event) {
    const btn = event.target;
    const studentKey = btn.dataset.studentKey;

    console.log(studentKey);
    
    const localStudents = JSON.parse(localStorage.getItem('students'));
    const student = localStudents[studentKey];

    console.log(student);

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

    // Reset the table
    const studentsRow = document.getElementById('students-row');
    studentsRow.innerHTML = "";

    // Rerender the table
    buildStudentTable();

    const deleteStudent = JSON.parse(localStorage.getItem('delete-student'));
    console.log("Delete:", deleteStudent);
}

export { updateStudentCb, deleteStudentCb };