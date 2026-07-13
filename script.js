document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('To-do-Input')
    const addBtn = document.getElementById('add-task-btn')
    const toDoList = document.getElementById('To-do-List')

    let tasks = JSON.parse(localStorage.getItem('tasks')) || []
    tasks.forEach(task => {
        renderTask(task)
    });
    addBtn.addEventListener('click', () => {
        const taskText = inputField.value.trim()
        if (taskText === "") return

        const myTask =
        {
            id: Date.now(),
            text: taskText,
            completed: false
        }

        tasks.push(myTask)
        saveTask()
        renderTask(myTask)
        inputField.value = ""
        console.log(tasks)

    })

    function renderTask(task) {
        const li = document.createElement('li')
        if (task.completed) { li.classList.add('completed') }
        li.setAttribute('data-id', task.id)
        li.innerHTML = `
        <span>${task.text}</span>
        <button>DELETE</button>`
        toDoList.appendChild(li)

        li.addEventListener('click', (e) => {
            if (e.target.tagName === "BUTTON") return
            task.completed = !task.completed
            li.classList.toggle('completed')

            saveTask()
        })

        li.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation()
            tasks = tasks.filter((t) => t.id !== task.id)
            li.remove()
            saveTask()
        })
    }

    function saveTask() {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }

})
