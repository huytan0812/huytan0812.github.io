import { AllTaskComponent } from "./components/all_tasks.js";
import { ActiveTaskComponent } from "./components/active_tasks.js"
import { CompletedTaskComponent } from "./components/completed_tasks.js";
import { AddTaskComponent } from "./components/add_task.js";

let TASKS_TO_DISPLAY = {};

document.addEventListener("DOMContentLoaded", function index() {
    const addTC = document.getElementsByTagName('addtaskcomponent')[0];
    addTC.innerHTML = AddTaskComponent();
    
    // Get local storage tasks
    const LStasks = JSON.parse(localStorage.getItem("tasks"));
    const tasks = (LStasks) ? LStasks : {};
    const displayTasks = document.getElementById('display-tasks');

    // Default render All task component
    displayTasks.innerHTML = AllTaskComponent();

    // Default display tasks in All task component
    const allTasks = () => {
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

    TASKS_TO_DISPLAY = allTasks();

    console.log(TASKS_TO_DISPLAY);

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
        addTask(addTaskForm);
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
}

function displayTasksFn(allTasks = {}) {
    console.log("Incompleted tasks:", allTasks["incompletedTasks"]);
    console.log("Completed tasks:", allTasks["completedTasks"]);
}

export { TASKS_TO_DISPLAY };