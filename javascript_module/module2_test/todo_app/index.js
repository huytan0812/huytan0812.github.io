import { AllTaskComponent } from "./components/all_tasks.js";
import { ActiveTaskComponent } from "./components/active_tasks.js"
import { CompletedTaskComponent } from "./components/completed_tasks.js";
import { AddTaskComponent } from "./components/add_task.js";

let LS_TASKS = JSON.parse(localStorage.getItem("tasks"));
let TASKS = (LS_TASKS) ? LS_TASKS : {};
let TASKS_TO_DISPLAY = [];
let TASKS_TO_DELETE = [];

document.addEventListener("DOMContentLoaded", function index() {
    const addTC = document.getElementsByTagName('addtaskcomponent')[0];
    addTC.innerHTML = AddTaskComponent();

    const addTaskForm = document.forms["add-task"];
    const deleteTask = document.getElementById('delete-task');
    const deleteBtnTask = document.getElementById('delete-task-btn');
    
    const displayTasks = document.getElementById('display-tasks');
    
    // Default disable delete task
    deleteTask.style.display = 'none';

    // Default display tasks in All task component
    const allTasks = () => {
        let incompletedTasks = [];
        let completedTasks = [];

        for (let key in TASKS) {
            let task = {};
            task[key] = TASKS[key];

            if (task[key]["incompleted"]) {
                incompletedTasks.unshift(task);
            }
            else {
                completedTasks.unshift(task);
            }
        }

        const result = incompletedTasks.concat(completedTasks);

        return result;
    }

    TASKS_TO_DISPLAY = allTasks();

    // Default render All task component
    displayTasks.innerHTML = AllTaskComponent(TASKS_TO_DISPLAY);

    // Default Attach event handler for every checkbox
    attachCheckboxHandlerAll();

    // All Tasks Component
    const allBtn = document.getElementById('all');
    allBtn.addEventListener("click", function() {
        // Switch to current component
        currentActive.classList.remove("active-component");

        // Enable add task form
        addTaskForm.style.display = 'block';

        // Disable delete task component
        deleteTask.style.display = 'none';

        // Display tasks
        const tasksToDisplay = () => {
            let incompletedTasks = [];
            let completedTasks = [];
    
            for (let key in TASKS) {
                let task = {};
                task[key] = TASKS[key];
    
                if (task[key]["incompleted"]) {
                    incompletedTasks.unshift(task);
                }
                else {
                    completedTasks.unshift(task);
                }
            }
    
            const result = incompletedTasks.concat(completedTasks);
    
            // return an array of tasks
            return result;
        }
    
        TASKS_TO_DISPLAY = tasksToDisplay();

        displayTasks.innerHTML = AllTaskComponent();
        currentActive = allBtn;
        currentActive.classList.add("active-component");

        attachCheckboxHandlerAll();
    })

    let currentActive = allBtn;

    // Active Tasks Component
    const activeBtn = document.getElementById('active');
    activeBtn.addEventListener("click", function() {
        // Switch to current component
        currentActive.classList.remove("active-component");

        // Enable add task form
        addTaskForm.style.display = 'block';

        // Disable delete task component
        deleteTask.style.display = 'none';

        // Display only incompleted tasks
        const tasksToDisplay = () => {
            let incompletedTasks = [];

            for (let key in TASKS) {
                let task = {};
                task[key] = TASKS[key];

                if (task[key]["incompleted"]) {
                    incompletedTasks.unshift(task);
                }
            }

            return incompletedTasks;
        }

        TASKS_TO_DISPLAY = tasksToDisplay();

        displayTasks.innerHTML = ActiveTaskComponent();
        currentActive = activeBtn;
        currentActive.classList.add("active-component");

        attachCheckboxHandlerAll();
    })

    // Incompleted Tasks Component
    const completedBtn = document.getElementById('completed');
    completedBtn.addEventListener("click", function() {
        // Disable add task form
        addTaskForm.style.display = 'none';

        // Enable delete task component
        deleteTask.style.display = 'flex';
        deleteBtnTask.innerHTML = "Delete";

        currentActive.classList.remove("active-component");

        // Display only incompleted tasks
        const tasksToDisplay = () => {
            let incompletedTasks = [];

            for (let key in TASKS) {
                let task = {};
                task[key] = TASKS[key];

                if (!task[key]["incompleted"]) {
                    incompletedTasks.unshift(task);
                }
            }

            return incompletedTasks;
        }

        TASKS_TO_DISPLAY = tasksToDisplay();

        displayTasks.innerHTML = CompletedTaskComponent();

        currentActive = completedBtn;
        currentActive.classList.add("active-component");

        attachDeleteTaskHandler();
    })

    addTaskForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const newTask = addTask(addTaskForm);

        // Update tasks after adding new task
        TASKS = JSON.parse(localStorage.getItem("tasks"));


        // Hanlde after adding new task to local storage
        const firstTask = displayTasks.firstElementChild;
        const newTaskRow = document.createElement('p');
        newTaskRow.innerHTML = `
        <input class="form-check-input task-checkbox" data-task-key="${ newTask['key'] }" type="checkbox" value="" id="${ newTask['key'] }">
        <label class="form-check-label ps-2" data-task-name="${ newTask['task']["name"] }" for="${ newTask['key'] }">
            ${ newTask['task']["name"] }
        </label>
        `;
        displayTasks.insertBefore(newTaskRow, firstTask);

        // Attach event handler to new check box
        const checkbox = newTaskRow.getElementsByClassName('task-checkbox')[0];
        attachCheckboxHandler(checkbox);
    })

    deleteBtnTask.addEventListener("click", () => {
        for (let key of TASKS_TO_DELETE) {
            delete TASKS[key];
        }

        const deleteTaskCbs = document.querySelectorAll('.delete-task-checkbox');
        deleteTaskCbs.forEach(
            (checkbox) => {
                if (checkbox.checked) {
                    checkbox.parentElement.remove();
                }
            }
        )

        deleteBtnTask.innerHTML = "Delete";
        // Reset tasks to delete
        TASKS_TO_DELETE = [];

        localStorage.setItem("tasks", JSON.stringify(TASKS));
    })
})

function addTask(form) {
    const task = form.elements["task"].value;

    const PK = JSON.parse(localStorage.getItem("PK"));
    const currentKey = (PK) ? PK : 0;

    const nextKey = currentKey + 1;

    const taskKey = `task_${nextKey}`;
    const newTask = {
        'name': task,
        'incompleted': true,
    };

    TASKS[taskKey] = newTask;

    // Save to local storage
    localStorage.setItem("tasks", JSON.stringify(TASKS));
    localStorage.setItem("PK", nextKey);

    // Clear the field
    form.elements["task"].value = "";

    return {
        'key': taskKey,
        'task': newTask
    };
}

function attachCheckboxHandlerAll() {
    const taskCheckboxes = document.querySelectorAll('.task-checkbox');
    if (taskCheckboxes.length != 0) {
        taskCheckboxes.forEach(
            (checkbox) => attachCheckboxHandler(checkbox)
        )
    }
}

function attachCheckboxHandler(checkbox) {
    checkbox.addEventListener("change", (event) => {
        const target = event.target;
        const taskKey = target.dataset.taskKey;

        if (TASKS.hasOwnProperty(taskKey)) {
            (target.checked) ? complete(target) : incomplete(target);
        }
    })
} 

function complete(checkbox) {
    const taskKey = checkbox.dataset.taskKey;
    const label = checkbox.nextElementSibling;
    const taskName = label.dataset.taskName;

    label.innerHTML = `<s>${ taskName }</s><span style="color: green; font-size: 1.5rem;">Đánh dấu là đã hoàn thành</span>`;
    TASKS[taskKey]["incompleted"] = false;
    
    // Update to local storage
    localStorage.setItem("tasks", JSON.stringify(TASKS));
}

function incomplete(checkbox) {
    const taskKey = checkbox.dataset.taskKey;
    const label = checkbox.nextElementSibling;
    const taskName = label.dataset.taskName;

    label.innerHTML = `${ taskName }`;
    TASKS[taskKey]["incompleted"] = true;

    // Update to local storage
    localStorage.setItem("tasks", JSON.stringify(TASKS));
}

function attachDeleteTaskHandler() {
    const deleteTaskBtn = document.getElementById('delete-task-btn');
    const deleteTaskCbs = document.querySelectorAll('.delete-task-checkbox');

    deleteTaskCbs.forEach(
        (checkbox) => {
            checkbox.addEventListener("change", () => {
                const taskKey = checkbox.dataset.taskKey;
                if (TASKS.hasOwnProperty(taskKey)) {
                    if (checkbox.checked) {
                        TASKS_TO_DELETE.push(taskKey);
                    }
                    else {
                        const undeletedTaskIndex = TASKS_TO_DELETE.indexOf(taskKey);

                        // if found
                        if (undeletedTaskIndex > -1) {
                            TASKS_TO_DELETE.splice(undeletedTaskIndex, 1);
                        }
                    }
                    deleteTaskBtn.innerHTML = `Delete (${ TASKS_TO_DELETE.length })`;
                }
                console.log(TASKS_TO_DELETE);
            })
        }
    )
}

export { TASKS_TO_DISPLAY };