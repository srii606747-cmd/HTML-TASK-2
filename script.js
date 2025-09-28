// Dark Mode Toggle
document.getElementById("darkModeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Form Validation
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let subject = document.getElementById("subject").value;
  let terms = document.getElementById("terms").checked;
  let formMessage = document.getElementById("formMessage");

  let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  let phonePattern = /^[0-9]{10}$/;

  if (!name || !email || !phone || !subject) {
    formMessage.textContent = "All fields are required!";
    formMessage.style.color = "red";
  } else if (!email.match(emailPattern)) {
    formMessage.textContent = "Enter a valid email!";
    formMessage.style.color = "red";
  } else if (!phone.match(phonePattern)) {
    formMessage.textContent = "Enter a valid 10-digit phone number!";
    formMessage.style.color = "red";
  } else if (!terms) {
    formMessage.textContent = "You must agree to terms!";
    formMessage.style.color = "red";
  } else {
    formMessage.textContent = "Form submitted successfully!";
    formMessage.style.color = "green";
  }
});

// To-Do List with LocalStorage
let taskList = document.getElementById("taskList");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks(filter = "all") {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    if (filter === "active" && task.completed) return;
    if (filter === "completed" && !task.completed) return;

    let li = document.createElement("li");
    li.textContent = task.text;
    if (task.completed) li.classList.add("completed");

    let btns = document.createElement("div");

    let toggleBtn = document.createElement("button");
    toggleBtn.textContent = "✔";
    toggleBtn.onclick = () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
    };

    let removeBtn = document.createElement("button");
    removeBtn.textContent = "X";
    removeBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
    };

    btns.appendChild(toggleBtn);
    btns.appendChild(removeBtn);
    li.appendChild(btns);
    taskList.appendChild(li);
  });
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

document.getElementById("addTask").addEventListener("click", () => {
  let taskInput = document.getElementById("taskInput");
  let text = taskInput.value.trim();
  if (text) {
    tasks.push({ text, completed: false });
    taskInput.value = "";
    saveTasks();
  }
});

document.querySelectorAll(".filters button").forEach(btn => {
  btn.addEventListener("click", () => {
    renderTasks(btn.dataset.filter);
  });
});

// Initial render
renderTasks();
