document.addEventListener('DOMContentLoaded', () => {
    const inputToDo = document.getElementById("input-toDo");
    const addTODoBtn = document.getElementById("add-task-btn");
    const toDoList = document.getElementById("toDo_List");

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach((task) => renderTask(task));

    addTODoBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const inputText = inputToDo.value.trim();
      if (inputText === "") return;
      const newTask = {
        id: Date.now(),
        task: inputText,
        isCompleted: false,
      };
        tasks.push(newTask);
        saveTask();
        renderTask(newTask);
      inputToDo.value = "";
    });

    function renderTask(task) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.task}</span>
            <button id='delete-task-btn'>Delete</button>`;

        li.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') return;
            task.isCompleted = !task.isCompleted;
            li.classList.toggle('completed');
            saveTask();
        })

        li.querySelector("#delete-task-btn").addEventListener('click', (e) => {
            e.stopPropagation();
            tasks = tasks.filter((item) => item.id !== task.id);
            li.remove();
            saveTask()
        });

        toDoList.appendChild(li)
    }

    const saveTask = () => {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    };

})
