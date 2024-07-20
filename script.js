// script.js

document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskCategory = document.getElementById('task-category');
    const taskList = document.getElementById('task-list');
    const filterInput = document.getElementById('filter-input');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Agregar tarea
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = taskInput.value;
        const category = taskCategory.value;
        const newTask = {
            text: taskText,
            category: category,
            completed: false,
        };
        tasks.push(newTask);
        saveTasks();
        renderTasks();
        taskForm.reset();
    });

    // Completar, editar o eliminar tarea
    taskList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const button = e.target;
            const index = button.dataset.index;
            const action = button.dataset.action;
            if (action === 'complete') {
                tasks[index].completed = !tasks[index].completed;
            } else if (action === 'edit') {
                const newText = prompt('Editar tarea:', tasks[index].text);
                if (newText) {
                    tasks[index].text = newText;
                }
            } else if (action === 'delete') {
                tasks.splice(index, 1);
            }
            saveTasks();
            renderTasks();
        }
    });

    // Filtrar tareas
    filterInput.addEventListener('input', () => {
        renderTasks();
    });

    // Renderizar tareas
    function renderTasks() {
        taskList.innerHTML = '';
        const filterText = filterInput.value.toLowerCase();
        tasks.forEach((task, index) => {
            if (task.text.toLowerCase().includes(filterText) || task.category.toLowerCase().includes(filterText)) {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span style="text-decoration: ${task.completed ? 'line-through' : 'none'};">
                        ${task.text} (${task.category})
                    </span>
                    <div>
                        <button data-index="${index}" data-action="complete">
                            ${task.completed ? 'Descompletar' : 'Completar'}
                        </button>
                        <button data-index="${index}" data-action="edit">Editar</button>
                        <button data-index="${index}" data-action="delete">Eliminar</button>
                    </div>
                `;
                taskList.appendChild(li);
            }
        });
    }

    // Guardar tareas en localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Inicializar renderizado de tareas
    renderTasks();
});