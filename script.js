const inputBox = document.getElementById("inputBox");
const listContainer = document.getElementById("listContainer");

function addTask() {
    if (inputBox.value.trim() === '') {
        alert("You must write something!!");
        return;
    }

    let li = document.createElement("li");

    let checkbox = document.createElement("div");
    checkbox.classList.add("checkbox");
    checkbox.onclick = function () {
        li.classList.toggle("checked");
        saveData();
    };

    let text = document.createElement("span");
    text.textContent = inputBox.value;

    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "❌";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = function () {
        li.remove();
        saveData();
    };

    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(deleteBtn);
    listContainer.appendChild(li);

    inputBox.value = "";
    saveData();
}

function saveData() {
    let tasks = [];
    document.querySelectorAll("#listContainer li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").textContent,
            checked: li.classList.contains("checked")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => {
        let li = document.createElement("li");

        let checkbox = document.createElement("div");
        checkbox.classList.add("checkbox");
        if (task.checked) {
            li.classList.add("checked");
        }
        checkbox.onclick = function () {
            li.classList.toggle("checked");
            saveData();
        };

        let text = document.createElement("span");
        text.textContent = task.text;

        let deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "❌";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = function () {
            li.remove();
            saveData();
        };

        li.appendChild(checkbox);
        li.appendChild(text);
        li.appendChild(deleteBtn);
        listContainer.appendChild(li);
    });
}

loadTasks();

