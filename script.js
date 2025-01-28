document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Initialize an empty array to hold the tasks
    let tasks = [];

    // Function to load tasks from Local Storage
    const loadTasks = () => {
        // Check if there are any tasks in localStorage
        const storedTasks = localStorage.getItem('tasks');
        
        if (storedTasks) {
            // If tasks exist, parse them from JSON and load them into the DOM
            tasks = JSON.parse(storedTasks);

            // Loop through the tasks and create list items
            tasks.forEach(taskText => {
                const taskItem = document.createElement('li');
                taskItem.textContent = taskText;

                const removeButton = document.createElement('button');
                removeButton.textContent = 'Remove';
                removeButton.className = 'remove-btn';

                // Remove task when the remove button is clicked
                removeButton.onclick = () => {
                    removeTask(taskText, taskItem);
                };

                taskItem.appendChild(removeButton);
                taskList.appendChild(taskItem);
            });
        }
    };

    // Function to save tasks to Local Storage
    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Store the task array as a JSON string
    };

    // Function to add a task
    const addTask = () => {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        // Create task element in the DOM
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Remove task when the remove button is clicked
        removeButton.onclick = () => {
            removeTask(taskText, taskItem);
        };

        taskItem.appendChild(removeButton);
        taskList.appendChild(taskItem);

        // Add task to tasks array and save it to Local Storage
        tasks.push(taskText);
        saveTasks();

        // Clear the input field
        taskInput.value = "";
    };

    // Function to remove a task
    const removeTask = (taskText, taskItem) => {
        // Remove task from tasks array
        tasks = tasks.filter(task => task !== taskText);

        // Remove task element from the DOM
        taskList.removeChild(taskItem);

        // Update Local Storage with the updated tasks array
        saveTasks();
    };

    // Event listener for the "Add Task" button
    addButton.addEventListener('click', addTask);

    // Event listener for the "Enter" key in the input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks from Local Storage when the page loads
    loadTasks();
});
