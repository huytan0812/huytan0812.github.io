import { updateStudentCb, deleteStudentCb } from '../index.js';
import { PaginationComponent } from "./pagination_component.js";

function StudentTableComponent(page = 3) {
    const studentTable = document.createElement('table');
    studentTable.className = 'table';
    studentTable.innerHTML = `
    <thead>
        <tr>
        <th scope="col">STT</th>
        <th scope="col">Tên</th>
        <th scope="col">Giới tính</th>
        <th scope="col">Điểm toán</th>
        <th scope="col">Điểm Anh</th>
        <th scope="col">Điểm văn</th>
        <th scope="col">Điểm trung bình</th>
        <th scope="col">Hành động</th>
        </tr>
    </thead>
    `

    const tbody = document.createElement('tbody');
    tbody.setAttribute('id', 'students-row');
    studentTable.append(tbody);

    // Get all students from local storage
    const localStudents = JSON.parse(localStorage.getItem('students'));
    const studentCount = (localStudents) ? Object.keys(localStudents).length : 0;
    console.log("Student count:", studentCount);

    const tfoot = document.createElement('tfoot');
    tfoot.innerHTML = `
    <tr>
        <td colspan="8" class="d-flex flex-column justify-content-center">
            ${PaginationComponent(studentCount)}
        </td>
    </tr>
    `;
    studentTable.append(tfoot);

    const studentsArr = Object.entries(localStudents);

    let endIndex = page * 5;
    let startIndex = endIndex - 5;

    if (endIndex > studentsArr.length) {
        endIndex = studentsArr.length;
    }

    for (let i = startIndex; i < endIndex; i++) {
        console.log(studentsArr[i]);
    }

    let count = 1;

    for (let studentKey in localStudents) {
        tbody.append(studentRow(count, studentKey, localStudents[studentKey]));
        count++;
    }

    return studentTable;
}

function studentRow(count, studentKey, studentInfo) {
    // Create a student row for each student info
    const tr = document.createElement('tr');

    const studentRowId = `row-${studentKey}`;
    tr.setAttribute('id', studentRowId);

    const stt = document.createElement('td');
    stt.innerHTML = count;
    tr.append(stt);

    for (let prop in studentInfo) {
        const td = document.createElement('td');
        td.className = 'student-field';
        td.dataset.fieldName = prop;
        td.innerHTML = studentInfo[prop];
        tr.append(td);
    }

    const average = document.createElement('td');
    average.className = 'average-score';
    average.innerHTML = getAverageScore(studentInfo);
    tr.append(average);

    const action = document.createElement('td');
    action.innerHTML = `
    <button type="button" class="btn btn-success update-btn" data-update-student="${studentKey}">Update</button>
    <button type="button" class="btn btn-danger delete-btn" data-delete-student="${studentKey}">Delete</button>
    `;
    tr.append(action);

    const updateBtn = action.getElementsByClassName('update-btn')[0];
    const deleteBtn = action.getElementsByClassName('delete-btn')[0];
    updateBtn.addEventListener("click", () => updateStudentCb(updateBtn));
    deleteBtn.addEventListener("click", () => deleteStudentCb(deleteBtn));

    return tr;
}

function getAverageScore(student) {
    const mathScore = parseInt(student.math_score);
    const englishScore = parseInt(student.english_score);
    const literatureScore = parseInt(student.literature_score);

    return (mathScore + englishScore + literatureScore) / 3;
}

export {StudentTableComponent, studentRow, getAverageScore};