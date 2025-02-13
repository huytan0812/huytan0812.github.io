import { StudentFormComponent } from './components/student_form.js';
import { StudentTableComponent, studentRow, getAverageScore} from './components/student_table_component.js';

document.addEventListener("DOMContentLoaded", function index() {
    buildStudentForm();

    buildStudentTable();

    const studentForm = document.forms["student-form"];
    studentForm.addEventListener("submit", (event) => addStudent(event, studentForm));

    const searchForm = document.forms["search-form"];
    searchForm.addEventListener("submit", (event) => search(event));
})

function buildStudentForm() {
    const studentFormComponent = document.getElementsByTagName('studentformcomponent')[0];
    studentFormComponent.innerHTML = StudentFormComponent();
}

function buildStudentTable(page = 1) {
    const studentTableComponent = document.getElementsByTagName('studenttablecomponent')[0];
    studentTableComponent.innerHTML = '';
    studentTableComponent.appendChild(StudentTableComponent(page));

    const prevBtn = document.getElementById('prev-btn');
    prevBtn.addEventListener("click", () => buildStudentTable(page - 1));

    const pageBtns = document.querySelectorAll('.page-btn');
    pageBtns.forEach(
        (pageBtn) => pageBtn.addEventListener("click", () => {
            buildStudentTable(pageBtn.dataset.page);
        })
    )

    const nextBtn = document.getElementById('next-btn');
    nextBtn.addEventListener("click", () => buildStudentTable(page + 1));
}

function addStudent(event, studentForm) {
    // Prevent the from from submiting
    event.preventDefault();

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
    localStorage.setItem('newStudentKey', JSON.stringify(nextStudentKey));
    
    // Rerender the page
    buildStudentTable();
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

    // Reset the table
    const studentsRow = document.getElementById('students-row');
    studentsRow.innerHTML = "";

    // Rerender the table
    buildStudentTable();
}

function search(event) {
    event.preventDefault();

    const q = document.getElementById('search');
    
    const localStudents = JSON.parse(localStorage.getItem('students'));

    const studentsArr = Object.entries(localStudents);

    let result = "Học sinh không tồn tại";

    for (let i = 0; i < studentsArr.length; i++) {
        const student = studentsArr[i][1];
        const studentName = student['name'];
        
        if (q.value == studentName) {
            result = q.value;
            break;
        }
    }

    const searchResult = document.getElementById('search-result');
    searchResult.innerHTML = `
    <p style="text-align: center; font-weight: bold;" class="mt-2 mb-2">${ result }</p>
    `;
}

export { updateStudentCb, deleteStudentCb };