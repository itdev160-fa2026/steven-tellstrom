// Steven Tellstrom, ITDEV-160, 10-19-2025
// Activity-6 Interactive To-Do List (Enhanced)

/* APPLICATION STATE OBJECT - data storage all in one place */
const todoApp = 
{
    taskIdCounter: 1, //counter to assign unique ID
    currentFilter: 'all', // tracks current filter (ALL, PENDING, COMPLETED)
    tasks: [] //array that stores all tasks
};

//_______________________________________________________________________________________________________________________
/* CORE TASK MANAGEMENT FUNCTIONS */

//function to add new task to the list
function addTask(taskText) 
{
    console.log("\n----- addTask() function -----");
    
    var prioritySelect = document.getElementById("prioritySelect");//gets priority selection from dropdown... default to med if not found
    var priority = 'medium';
    
    if (prioritySelect) 
    {
        priority = prioritySelect.value;
    }
    
    if (!taskText || taskText.trim() === "") 
    {
        console.log("empty input, task not added");
        alert("please enter a task!");
        return;
    }
    
    var task = 
    {
        id: todoApp.taskIdCounter++, //unique ID and increment counter
        text: taskText.trim(),
        priority: priority, //high, medium, or low priority
        completed: false, //new tasks start as incomplete
        timestamp: new Date() //record when task was created
    };
    
    //add task to application state
    todoApp.tasks.push(task);
    
    //create dom element
    var taskElement = createTaskElement(task); 
    var todoList = document.getElementById("todo-list");
    todoList.appendChild(taskElement);
    
    updateTaskStats();
    updateEmptyState();
}

//function to create DOM element for a single task
function createTaskElement(task) 
{ 

    var listItem = document.createElement("li");
    listItem.classList.add("task-item");
    listItem.dataset.taskId = task.id; //store task ID for later reference
    

    var priorityBar = document.createElement("div");
    priorityBar.classList.add("task-priority", `priority-${task.priority}`);
    
    var taskText = document.createElement("span");
    taskText.textContent = task.text;
    taskText.classList.add("task-text");
    taskText.addEventListener('dblclick', function() { editTask(task.id); });
    
    var actions = document.createElement("div");
    actions.classList.add("task-actions");
    
    var toggleBtn = document.createElement("button");
    toggleBtn.textContent = task.completed ? "Undo" : "Done";
    toggleBtn.classList.add("task-btn", "toggle-btn");
    toggleBtn.addEventListener('click', function() { toggleTaskStatus(task.id); });
    
    var deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("task-btn", "delete-btn");
    deleteBtn.addEventListener('click', function() { deleteTask(task.id); });
    
    actions.appendChild(toggleBtn);
    actions.appendChild(deleteBtn);
    
    listItem.appendChild(priorityBar);
    listItem.appendChild(taskText);
    listItem.appendChild(actions);
    
    if (task.completed) 
    {
        listItem.classList.add("completed");
    }
    
    return listItem;
}

//_______________________________________________________________________________________________________________________
/* TASK MANIPULATION FUNCTIONS */

//function to remove task from both data and display
function deleteTask(taskId) 
{
    console.log("\n----- deleteTask() function -----");
    
    //find task object to get its text for confirmation
    var task = todoApp.tasks.find(function(t) { return t.id === taskId; });
    if (!task) return; //exit if task not found
    
    var confirmDelete = confirm(`Are you sure you want to delete "${task.text}"?`);
    if (!confirmDelete) return; //exit if user cancels
    
    //remove task from app state array
    var taskIndex = todoApp.tasks.findIndex(function(task) { return task.id === taskId; });
    if (taskIndex !== -1) 
    {
        todoApp.tasks.splice(taskIndex, 1); // Remove 1 element at found index
    }
    
    //remove task element from dom display
    var taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
    if (taskElement) 
    {
        taskElement.remove();
    }
    
    //update UI components after deletion
    updateTaskStats();  //recalculate task counts
    updateEmptyState(); //show empty message if no tasks remain
}

function toggleTaskStatus(taskId) 
{
    console.log("\n----- toggleTaskStatus() function -----");
    
    //find and update task completion status in application state
    var task = todoApp.tasks.find(function(t) { return t.id === taskId; });
    if (task) 
    {
        task.completed = !task.completed; //flip boolean value
    }
    
    //update dom element to reflect new status
    var taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
    if (taskElement) 
    {
        
        taskElement.classList.toggle('completed');
        
        var toggleBtn = taskElement.querySelector(".toggle-btn");
        if (toggleBtn) {
            toggleBtn.textContent = task.completed ? "Undo" : "Done";
        }
    }
    
    updateTaskStats(); 
}

//_______________________________________________________________________________________________________________________
/* UI UPDATE AND DISPLAY FUNCTIONS */

//function to calculate + display current task statistics
function updateTaskStats() 
{
    //calculate totals from application state
    var total = todoApp.tasks.length;
    var completed = todoApp.tasks.filter(function(task) { return task.completed; }).length;
    
    var taskCount = document.getElementById("taskCount");
    if (taskCount) 
    {
        taskCount.textContent = `(${total} tasks, ${completed} completed)`;
    }
}

//function to show+hide tasks (completion status filter)
function filterTasks(filterType) 
{
    console.log("\n----- filterTasks() function -----");
    
    //update application state to remember current filter
    todoApp.currentFilter = filterType;
    
    var taskElements = document.querySelectorAll(".task-item");
    
    //loop through each task element and determine visibility
    taskElements.forEach(function(element) {
        var taskId = parseInt(element.dataset.taskId);
        var task = todoApp.tasks.find(function(t) { return t.id === taskId; });
        
        if (!task) return; //skip if task data not found
        
        //determine if task should be visible based on filter type
        var shouldShow = false;
        
        if (filterType === 'all') 
        {
            shouldShow = true;
        } else if (filterType === 'pending') 
        {
            shouldShow = !task.completed;
        } else if (filterType === 'completed') 
        {
            shouldShow = task.completed;
        }
        
        element.classList.toggle("hidden", !shouldShow);
    });
    
    updateFilterButtons(filterType); 
}

//function to update visual state of filter buttons
function updateFilterButtons(activeFilter) 
{
    var filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach(function(btn) {
        
        btn.classList.toggle("active", btn.dataset.filter === activeFilter);//add active class to current filter button, remove from others
    });
}

//function to show+hide empty state message when no tasks exist
function updateEmptyState() 
{
    var emptyState = document.getElementById("emptyState");
    if (emptyState) {
        //hide empty message when tasks exist, show when no tasks
        emptyState.classList.toggle("hidden", todoApp.tasks.length > 0);
    }
}

//_______________________________________________________________________________________________________________________
/* ADVANCED FEATURES */

//function to edit existing task text with double click
function editTask(taskId) 
{
    
    var task = todoApp.tasks.find(function(t) { return t.id === taskId; });
    if (!task) return;
    
    var newText = prompt("Edit task:", task.text);
    if (newText && newText.trim() !== "") 
    {
        
        task.text = newText.trim();
        
        var taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
        var taskTextSpan = taskElement.querySelector(".task-text");
        if (taskTextSpan) 
        {
            taskTextSpan.textContent = task.text;
        }
    }
}

//_______________________________________________________________________________________________________________________
/* BULK OPERATIONS */

//function to mark all pending tasks as completed
function markAllDone() 
{
    todoApp.tasks.forEach(function(task) 
    {
        if (!task.completed) 
        {
            toggleTaskStatus(task.id); 
        }
    });
}

function deleteCompleted() 
{
    var completedTasks = todoApp.tasks.filter(function(task) { return task.completed; });
    
    if (completedTasks.length === 0) 
    {
        alert("no completed tasks to delete.");
        return;
    }
    
    var confirmDelete = confirm(`Delete ${completedTasks.length} completed tasks?`);
    if (confirmDelete) 
    {
        
        completedTasks.forEach(function(task) { deleteTask(task.id); });
    }
}

function clearAllTasks() 
{
    if (todoApp.tasks.length === 0) 
    {
        alert("No tasks to clear.");
        return;
    }
    
    var confirmClear = confirm("Delete ALL tasks? This cannot be undone.");
    if (confirmClear) 
    {
        var allTasks = [];
        for (var i = 0; i < todoApp.tasks.length; i++) 
        {
            allTasks.push(todoApp.tasks[i]);
        }
        allTasks.forEach(function(task) { deleteTask(task.id); });
    }
}

//_______________________________________________________________________________________________________________________
/* EVENT LISTENERS AND INITIALIZATION */

document.addEventListener('DOMContentLoaded', function() 
{
    console.log("DOM loaded, initializing to-do list");
    
    document.getElementById("addBtn").addEventListener('click', function() 
    {
        var taskInput = document.getElementById("taskInput");
        if (taskInput) 
        {
            addTask(taskInput.value);  
            taskInput.value = "";     
        }
    });
    
    document.getElementById("taskInput").addEventListener('keypress', function(event) 
    {
        if (event.key === 'Enter') 
        {
            addTask(this.value);       
            this.value = "";            
        }
    });
    
    //filter button click handlers for all filter buttons
    var filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach(function(btn) 
    {
        btn.addEventListener('click', function() 
        {
            filterTasks(this.dataset.filter); //use data-filter attribute value
        });
    });
    
    //unit UI state on page load
    updateTaskStats();
    updateEmptyState();
    
    //bulk operation button handlers
    document.getElementById("markAllDoneBtn").addEventListener('click', markAllDone);
    document.getElementById("deleteCompletedBtn").addEventListener('click', deleteCompleted);
    document.getElementById("clearAllBtn").addEventListener('click', clearAllTasks);
    
    console.log("To-do list initialized");
});