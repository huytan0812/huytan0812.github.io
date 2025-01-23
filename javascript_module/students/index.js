document.addEventListener("DOMContentLoaded", function index() {
    renderAllStudent();

    const studentForm = document.forms["student-form"];
    const updateBtns = document.querySelectorAll(".update-btn");
    const deleteBtns = document.getElementsByClassName("delete-btn");

    studentForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const studentFormInputs = studentForm.querySelectorAll("input");
        const localStudents = JSON.parse(localStorage.getItem('students'));
        const currentStudent = Object.keys(localStudents).length;
        const nextStudentKey = `student_${currentStudent + 1}`;
        const newStudent = {};

        studentFormInputs.forEach((input) => {
            console.log(input.name);
            newStudent[input.name] = input.value;
        })

        localStudents[nextStudentKey] = newStudent;

        localStorage.setItem('students', JSON.stringify(localStudents));
    })

    updateBtns.forEach(
        (updateBtn) => {
            updateBtn.addEventListener("click", function() {
                // Get student id from data attribute
                const studentId = parseInt(this.dataset.updateStudent);

                // Get all students from the localStorage
                const localStudents = JSON.parse(localStorage.getItem("students"));

                // Get the current student uisng studentId
                const getStudent = localStudents[`student_${studentId}`];
                
                // Rebuild the Student Form
                const studentFormInputs = studentForm.querySelectorAll("input");

                studentFormInputs.forEach(
                    (input) => {
                        input.value = getStudent[input.name];
                    }
                )
            })
        }
    )

})

function renderAllStudent() {
    const localStudents = JSON.parse(localStorage.getItem('students'));

    const studentsRow = document.getElementById('students-row');
    let count = 1;

    for (let student in localStudents) {
        studentsRow.append(studentRow(count, localStudents[student]));
        count++;
    }
}

function getAverageScore(student) {
    return (student.math_score + student.english_score + student.literature_score) / 3;
}

function studentRow(count, student) {
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