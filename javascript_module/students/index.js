import { StudentFormComponent } from './components/student_form.js';
import { StudentTableComponent, studentRow, getAverageScore} from './components/student_table_component.js';
import { DeleteModalComponent } from './components/delete_modal.js';

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

function buildStudentTable(queryset = (localStorage.getItem('students')) ? JSON.parse(localStorage.getItem('students')) : {}, page = 1) {
    const studentTableComponent = document.getElementsByTagName('studenttablecomponent')[0];
    studentTableComponent.innerHTML = '';
    studentTableComponent.appendChild(StudentTableComponent(queryset, page));

    const prevBtn = document.getElementById('prev-btn');
    prevBtn.addEventListener("click", () => buildStudentTable(queryset, page - 1));

    const pageBtns = document.querySelectorAll('.page-btn');
    pageBtns.forEach(
        (pageBtn) => pageBtn.addEventListener("click", () => {
            buildStudentTable(queryset, parseInt(pageBtn.dataset.page));
        })
    )

    const nextBtn = document.getElementById('next-btn');
    nextBtn.addEventListener("click", () => buildStudentTable(queryset, page + 1));
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

    // Rerender the form
    buildStudentForm();
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

function displayDeleteModal(deleteBtn) {
    const studentKey = deleteBtn.dataset.deleteStudent;
    console.log("Deleting:", studentKey);

    const body = document.body;
    const deleteModalContainer = document.createElement('div');
    deleteModalContainer.innerHTML = DeleteModalComponent();

    body.appendChild(deleteModalContainer);
    console.log(body);
}

function deleteStudentCb(studentKey) {
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

    // Rerender the form
    buildStudentForm();
}

function search(event) {
    event.preventDefault();

    const q = document.getElementById('search');
    
    const localStudents = JSON.parse(localStorage.getItem('students'));

    const studentsArr = Object.entries(localStudents);

    const value = q.value.trim().toLowerCase();

    const searchResults = () => {
        let matchResults = {};
        let student;
        let studentName;

        for (let i = 0; i < studentsArr.length; i++) {
            student = studentsArr[i];
            studentName = student[1]['name'];

            if (student[1]['name'].toLowerCase().indexOf(value) != -1) {
                matchResults[student[0]] = student[1];
            }
        }
        
        return matchResults;
    }

    const results = searchResults();

    if (Object.keys(results).length == 0) {
        const searchResult = document.getElementsByTagName('studenttablecomponent')[0];
        searchResult.innerHTML = `
        <p style="color: red; text-align: center; font-weight: bold;">Không tồn tại học sinh</p>
        <p style="text-align: center;">
            <button type="button" class="btn btn-outline-dark" id="cancel-search-result">
                Huỷ
            </button>
        </p>
        `;

        const cancelSearchResult = document.getElementById('cancel-search-result');
        cancelSearchResult.addEventListener("click", () => {
            // Rerender student table by default
            buildStudentTable();
        })
    }
    else {
        buildStudentTable(results, 1);
        const resetTable = document.getElementById('reset-table');
        resetTable.parentElement.style.display = 'block';
        resetTable.addEventListener("click", () => {
            resetTable.parentElement.style.display = 'none';
            // Rerender student table by default
            buildStudentTable();
        })
    }
}

export { updateStudentCb, deleteStudentCb, displayDeleteModal };