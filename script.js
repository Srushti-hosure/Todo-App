const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const doneCount = document.getElementById("doneCount");
const totalCount = document.getElementById("totalCount");

let tasks = [];

function updateCounter() {
    totalCount.textContent = tasks.length;
    doneCount.textContent = tasks.filter(t => t.done).length;
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task.text;

        if (task.done) li.classList.add("completed");

        li.addEventListener("click", () => {
            tasks[index].done = !tasks[index].done;
            renderTasks();
        });

        const del = document.createElement("button");
        del.textContent = "✖";
        del.className = "delete-btn";

        del.addEventListener("click", (e) => {
            e.stopPropagation();
            tasks.splice(index, 1);
            renderTasks();
        });

        li.appendChild(del);
        taskList.appendChild(li);
    });

    updateCounter();
}

addBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (!text) return;

    tasks.push({ text, done: false });
    taskInput.value = "";
    renderTasks();
});