import { AllTaskComponent } from "./components/all_tasks.js";
import { ActiveTaskComponent } from "./components/active_tasks.js"
import { CompletedTaskComponent } from "./components/completed_tasks.js";
import { AddTaskComponent } from "./components/add_task.js";

let TASKS_TO_DISPLAY = [];

document.addEventListener("DOMContentLoaded", function index() {
    const addTC = document.getElementsByTagName('addtaskcomponent')[0];
    addTC.innerHTML = AddTaskComponent();
    
    // Get local storage tasks
    const LStasks = JSON.parse(localStorage.getItem("tasks"));
    const tasks = (LStasks) ? LStasks : {};
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

    const allBtn = document.getElementById('all');
    allBtn.addEventListener("click", function() {
        // Switch to current component
        currentActive.classList.remove("active-component");
        displayTasks.innerHTML = AllTaskComponent();
        currentActive = allBtn;
        currentActive.classList.add("active-component");

        // Display tasks
        const tasksToDisplay = () => {
            let incompletedTasks = [];
            let completedTasks = [];
            let task;

            for (let key in tasks) {
                task = tasks[key];
                if (task["incompleted"]) {
                    incompletedTasks.push(task);
                }
                else {
                    completedTasks.push(task);
                }
            }

            return {
                'incompletedTasks': incompletedTasks,
                'completedTasks': completedTasks
            };
        }

        TASKS_TO_DISPLAY = tasksToDisplay();
    })

    let currentActive = allBtn;

    const activeBtn = document.getElementById('active');
    activeBtn.addEventListener("click", function() {
        currentActive.classList.remove("active-component");
        displayTasks.innerHTML = ActiveTaskComponent();
        currentActive = activeBtn;
        currentActive.classList.add("active-component");
    })

    const completedBtn = document.getElementById('completed');
    completedBtn.addEventListener("click", function() {
        currentActive.classList.remove("active-component");
        displayTasks.innerHTML = CompletedTaskComponent();
        currentActive = completedBtn;
        currentActive.classList.add("active-component");
    })

    const addTaskForm = document.forms["add-task"];
    addTaskForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const newTask = addTask(addTaskForm);
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

    return {
        'key': taskKey,
        'task': newTask
    };
}

export { TASKS_TO_DISPLAY };