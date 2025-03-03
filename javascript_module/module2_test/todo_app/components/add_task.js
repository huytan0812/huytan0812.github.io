function AddTaskComponent() {
    return `
    <form action="" method="post" id="add-task" class="mt-2">
        <div class="form-group d-flex justify-content-center">
            <label for="add-task-field" style="width: 50%;">
                <input type="text" name="task" id="add-task-field" class="form-control" placeholder="Task" required>
            </label>
            <button type="submit" class="btn btn-primary ms-2">Add</button>
        </div>
    </form>
    `;
}

export { AddTaskComponent };