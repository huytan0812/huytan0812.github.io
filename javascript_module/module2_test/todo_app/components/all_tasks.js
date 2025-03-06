import { TASKS_TO_DISPLAY } from "../index.js";

function AllTaskComponent() {
    let div = ``;
    let taskRow;
    let task;
    let taskKey;
    
    for (let i = 0; i < TASKS_TO_DISPLAY.length; i++) {
        task = TASKS_TO_DISPLAY[i];
        taskKey = Object.keys(task)[0];

        if (task[taskKey]["incompleted"]) {
            taskRow = `
            <p class="d-flex flex-row align-items-center task">
                <input class="form-check-input task-checkbox" data-task-key="${ taskKey }" type="checkbox" value="" id="${ taskKey }">
                <label class="form-check-label ps-2" data-task-name="${ task[taskKey]["name"] }" for="${ taskKey }">
                    ${ task[taskKey]["name"] }
                </label>
            </p>
            `;
        }
        else {
            taskRow = `
            <p class="d-flex flex-row align-items-center task">
                <input class="form-check-input task-checkbox" type="checkbox" data-task-key="${ taskKey }" value="" id="${ taskKey }" checked>
                <label class="form-check-label ps-2" data-task-name="${ task[taskKey]["name"] }" for="${ taskKey }">
                    <s>${ task[taskKey]["name"] }</s>
                </label>
            </p>
        `;
        }
        div += taskRow;
    }
    return div;
}

export { AllTaskComponent };