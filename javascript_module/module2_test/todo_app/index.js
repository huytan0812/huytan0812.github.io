import { AllTaskComponent } from "./components/all_tasks.js";
import { ActiveTaskComponent } from "./components/active_tasks.js"
import { CompletedTaskComponent } from "./components/completed_tasks.js";

document.addEventListener("DOMContentLoaded", function index() {
    const component = document.getElementById('component');

    // Default render All task component
    component.innerHTML = AllTaskComponent();

    const allBtn = document.getElementById('all');
    allBtn.addEventListener("click", function() {
        currentActive.classList.remove("active-component");
        component.innerHTML = AllTaskComponent();
        currentActive = allBtn;
        currentActive.classList.add("active-component");
    })

    let currentActive = allBtn;

    const activeBtn = document.getElementById('active');
    activeBtn.addEventListener("click", function() {
        currentActive.classList.remove("active-component");
        component.innerHTML = ActiveTaskComponent();
        currentActive = activeBtn;
        currentActive.classList.add("active-component");
    })

    const completedBtn = document.getElementById('completed');
    completedBtn.addEventListener("click", function() {
        currentActive.classList.remove("active-component");
        component.innerHTML = CompletedTaskComponent();
        currentActive = completedBtn;
        currentActive.classList.add("active-component");
    })
})