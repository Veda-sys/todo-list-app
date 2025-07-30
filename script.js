$(document).ready(function () {
  const taskInput = $("#taskInput");
  const taskList = $("#taskList");

  // Load tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTasks(filter = "all") {
    taskList.empty();
    tasks.forEach((task, index) => {
      if (
        filter === "all" ||
        (filter === "completed" && task.completed) ||
        (filter === "pending" && !task.completed)
      ) {
        const taskItem = $(`
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <span class="${task.completed ? "completed" : ""}">${task.text}</span>
            <div>
              <button class="btn btn-sm btn-success me-1 complete-btn" data-index="${index}">✔</button>
              <button class="btn btn-sm btn-danger delete-btn" data-index="${index}">🗑</button>
            </div>
          </li>
        `);
        taskList.append(taskItem);
      }
    });
  }

  $("#addTaskBtn").click(function () {
    const taskText = taskInput.val().trim();
    if (taskText) {
      tasks.push({ text: taskText, completed: false });
      saveTasks();
      renderTasks();
      taskInput.val("");
    }
  });

  taskList.on("click", ".delete-btn", function () {
    const index = $(this).data("index");
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  });

  taskList.on("click", ".complete-btn", function () {
    const index = $(this).data("index");
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
  });

  $(".filter-btn").click(function () {
    $(".filter-btn").removeClass("active");
    $(this).addClass("active");
    const filter = $(this).data("filter");
    renderTasks(filter);
  });

  renderTasks();
});
