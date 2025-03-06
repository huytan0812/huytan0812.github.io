import { AllTaskComponent } from "./components/all_tasks.js";
import { ActiveTaskComponent } from "./components/active_tasks.js"
import { CompletedTaskComponent } from "./components/completed_tasks.js";
import { AddTaskComponent } from "./components/add_task.js";

let TASKS_TO_DISPLAY = [];

document.addEventListener("DOMContentLoaded", function index() {
    const addTC = document.getElementsByTagName('addtaskcomponent')[0];
    addTC.innerHTML = AddTaskComponent();
    
    // Get local storage tasks
    let LStasks = JSON.parse(localStorage.getItem("tasks"));
    let tasks = (LStasks) ? LStasks : {};
    const displayTasks = document.getElementById('display-tasks');

    // Default display tasks in All task component
    const allTasks = () => {
        let incompletedTasks = [];
        let completedTasks = [];

        for (let key in tasks) {
            let task = {};
            task[key] = tasks[key];

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
    const taskCheckboxes = document.querySelectorAll('.task-checkbox');
    if (taskCheckboxes.length != 0) {
        taskCheckboxes.forEach(
            (checkbox) => checkbox.addEventListener("change", (event) => {
                const target = event.target;
                const taskKey = target.dataset.taskKey;
                const tasks = JSON.parse(localStorage.getItem("tasks"));

                if (tasks.hasOwnProperty(taskKey)) {
                    (target.checked) ? complete(target, tasks) : incomplete(target, tasks);
                }
            })
        )
    }

    // All Tasks Component
    const allBtn = document.getElementById('all');
    allBtn.addEventListener("click", function() {
        // Switch to current component
        currentActive.classList.remove("active-component");

        // Display tasks
        const tasksToDisplay = () => {
            let incompletedTasks = [];
            let completedTasks = [];
    
            for (let key in tasks) {
                let task = {};
                task[key] = tasks[key];
    
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
    })

    let currentActive = allBtn;

    // Active Tasks Component
    const activeBtn = document.getElementById('active');
    activeBtn.addEventListener("click", function() {
        // Switch to current component
        currentActive.classList.remove("active-component");

        // Display only incompleted tasks
        const tasksToDisplay = () => {
            let incompletedTasks = [];

            for (let key in tasks) {
                let task = {};
                task[key] = tasks[key];

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
    })

    // Incompleted Tasks Component
    const completedBtn = document.getElementById('completed');
    completedBtn.addEventListener("click", function() {
        currentActive.classList.remove("active-component");

        // Display only incompleted tasks
        const tasksToDisplay = () => {
            let incompletedTasks = [];

            for (let key in tasks) {
                let task = {};
                task[key] = tasks[key];

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
    })

    const addTaskForm = document.forms["add-task"];
    addTaskForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const newTask = addTask(addTaskForm);

        // Update tasks after adding new task
        tasks = JSON.parse(localStorage.getItem("tasks"));

        // Hanlde after adding new task to local storage
        const firstTask = displayTasks.firstElementChild;
        const newTaskRow = document.createElement('p');
        newTaskRow.innerHTML = `
        <input class="form-check-input" type="checkbox" value="" id="${ newTask['key'] }">
        <label class="form-check-label ps-2" for="${ newTask['key'] }">
            ${ newTask['task']["name"] }
        </label>
        `;
        displayTasks.insertBefore(newTaskRow, firstTask);
    })
})

function addTask(form) {
    const task = form.elements["task"].value;

    const LStasks = JSON.parse(localStorage.getItem("tasks"));
    const tasks = (LStasks) ? LStasks : {};
    const taskCount = (LStasks) ? Object.keys(LStasks).length : 0;

    const taskKey = `task_${taskCount + 1}`;
    const newTask = {
        'name': task,
        'incompleted': true,
    };

    tasks[taskKey] = newTask;

    // Save to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Clear the field
    form.elements["task"].value = "";

    return {
        'key': taskKey,
        'task': newTask
    };
}

function attachCheckboxHandler() {
    
}

function complete(checkbox, tasks) {
    const taskKey = checkbox.dataset.taskKey;
    const label = checkbox.nextElementSibling;
    const taskName = label.dataset.taskName;

    label.innerHTML = `<s>${ taskName }</s><span style="color: green; font-size: 1.5rem;">Đánh dấu là đã hoàn thành</span>`;
    tasks[taskKey]["incompleted"] = false;

    console.log("Complete task:", taskKey);
    
    // Update to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function incomplete(checkbox, tasks) {
    const taskKey = checkbox.dataset.taskKey;
    const label = checkbox.nextElementSibling;
    const taskName = label.dataset.taskName;

    label.innerHTML = `${ taskName }`;
    tasks[taskKey]["incompleted"] = true;

    console.log("Incomplete task:", taskKey);

    // Update to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

export { TASKS_TO_DISPLAY };