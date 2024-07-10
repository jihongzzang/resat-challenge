let tasks = [];

let selectedPriority = '';

let selectedFilter = 'all';

let selectedSortOrder = 'desc';

const priorityOrder = { low: 1, medium: 2, high: 3, 'very-high': 4 };

function getPriorityText(value) {
  if (value === 'low') return '낮음';
  if (value === 'medium') return '보통';
  if (value === 'high') return '높음';
  if (value === 'very-high') return '아주 높음';
  return '';
}

function setPriority(priority) {
  selectedPriority = priority;

  document.querySelectorAll('.priority-button').forEach((button) => {
    button.classList.remove('active');
  });

  document.querySelector(`.priority-button[onclick="setPriority('${priority}')"]`).classList.add('active');
}

function addTask() {
  const taskInput = document.getElementById('task-input');
  const taskText = taskInput.value.trim();

  if (taskText === '') {
    alert('할 일을 입력하세요.');
    return;
  }

  if (selectedPriority === '') {
    alert('우선순위를 설정하세요.');
    return;
  }

  tasks.push({ text: taskText, priority: selectedPriority, completed: false });
  taskInput.value = '';
  selectedPriority = '';

  document.querySelectorAll('.priority-button').forEach((button) => {
    button.classList.remove('active');
  });

  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  let filteredTasks = tasks;

  if (selectedFilter !== 'all') {
    filteredTasks = tasks.filter((task) => {
      if (selectedFilter === 'completed') return task.completed;
      if (selectedFilter === 'uncompleted') return !task.completed;
      return task.priority === selectedFilter;
    });
  }

  if (selectedSortOrder) {
    filteredTasks.sort((a, b) => {
      return selectedSortOrder === 'asc'
        ? priorityOrder[a.priority] - priorityOrder[b.priority]
        : priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  filteredTasks.forEach((task, index) => {
    const taskDiv = document.createElement('div');
    taskDiv.className = `task priority-${task.priority}`;
    taskDiv.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleCompleted(${index})">
      <span class="task-text">${task.text}</span>
      <span class="task-priority">${getPriorityText(task.priority)}</span>
      <button class="delete-button" onclick="deleteTask(${index})">삭제</button>
    `;
    taskList.appendChild(taskDiv);
  });
}

function toggleCompleted(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function updatePriority(index, newPriority) {
  tasks[index].priority = newPriority;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function filterTasks(filter) {
  selectedFilter = filter;

  document.querySelectorAll('.filter-button').forEach((button) => {
    button.classList.remove('active');
  });

  document.querySelector(`.filter-button[onclick="filterTasks('${filter}')"]`).classList.add('active');

  renderTasks(filter);
}

function sortTasks(order) {
  selectedSortOrder = order;

  document.querySelectorAll('.sort-button').forEach((button) => {
    button.classList.remove('active');
  });

  document.querySelector(`.sort-button[onclick="sortTasks('${order}')"]`).classList.add('active');

  tasks.sort((a, b) => {
    return order === 'asc'
      ? priorityOrder[a.priority] - priorityOrder[b.priority]
      : priorityOrder[b.priority] - priorityOrder[a.priority];
  });
  renderTasks();
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector(`.filter-button[onclick="filterTasks('all')"]`).classList.add('active');
  document.querySelector(`.sort-button[onclick="sortTasks('desc')"]`).classList.add('active');
  renderTasks();
});
