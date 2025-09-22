// Steven Tellstrom, ITDEV-160, 9-21-2025
// Activity-4 Interative To-Do List
//_______________________________________________________________________________________________________________________
console.log("PART A: ELEMENT CREATION & APPENDING DEMONSTRATIONS");

//- create new elements
const newButton = document.createElement("button");
const newParagraph = document.createElement("p");
const newDiv = document.createElement("div");
const newInput = document.createElement("input");

console.log("created button element", newButton);
console.log("created paragraph element", newParagraph);
console.log("created div element", newDiv);
console.log("created input element", newInput);

newParagraph.textContent = "[demo paragraph]";
newButton.textContent = "[demo button]";
newDiv.textContent = "[demo div]";

//- demonstrate setting properties on created elements
console.log("modified button element", newButton);
console.log("modified paragraph element", newParagraph);
console.log("modified div element", newDiv);

//- show difference between creating and appending
console.log("----- before Appending (elements exist but not in DOM): -----");
console.log("- parent node is:", newButton.parentNode); //NULL hasn't been added to DOM yet (hasn't been attatched to a parent)

//- appended elements to DOM
console.log("\n----- appending to DOM: -----");
const output = document.getElementById("output");
output.appendChild(newParagraph);
output.appendChild(newButton);
output.appendChild(newDiv);
output.appendChild(newInput);
//_______________________________________________________________________________________________________________________

console.log("PART B: ELEMENT STYLING DEMONSTRATIONS");

//- use element.style.propertyName to modify individual CSS properties
console.log("\n----- modifying CSS properties with element.style: -----");

newButton.style.backgroundColor = "lightpink";
newButton.style.padding = "10px 20px";
newButton.style.fontSize = "16px";
newButton.style.cursor = "pointer";
newButton.style.borderRadius = "8px";

console.log("applied inline styles to button:", newButton.style.cssText);

console.log("\n----- Adding CSS classes with classList.add(): -----");

const demoElement = document.createElement("p");
demoElement.textContent = "[Element for class demonstrations]";

demoElement.classList.add("task-item"); //classList.add() method
console.log("added 'task-item' class:", demoElement.className);

demoElement.classList.add("test-class");

//______________________________________________________________________________________________________________________

console.log("PART C: ELEMENTS APPENDING DEMONSTRATIONS");

console.log("\n----- using appendChild(): -----");
const child1 = document.createElement("p");
child1.textContent = "[appendChild child]";
output.appendChild(child1);
console.log("after appendChild:", output.children.length);

console.log("\n----- using prepend(): -----");
const child2 = document.createElement("p");
child2.textContent = "[prepend child - now first]";
output.prepend(child2);
console.log("after prepend:", output.children.length);

console.log("\n----- using insertBefore(): -----");
const child3 = document.createElement("p");
child3.textContent = "[inserted between children]";
output.insertBefore(child3, child1);
console.log("after insertBefore:", output.children.length);

console.log("\n----- using removeChild(): -----");
const removeMe = document.createElement("p");
removeMe.textContent = "[will be removed]";
output.appendChild(removeMe);
console.log("before remove:", output.children.length);
output.removeChild(removeMe);
console.log("after remove:", output.children.length);

//_______________________________________________________________________________________________________________________

console.log("PART D: TO-DO LIST CORE FUNCTIONALITY");

function addTask() {
    console.log("\n----- addTask() function -----");
    
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    console.log("input value:", taskText);
    
    if (taskText === "") {
        console.log("empty input, task not added");
        alert("please enter a task!");
        return;
    }
    
    const listItem = document.createElement("li");
    listItem.textContent = taskText;
    listItem.classList.add("task-item");
    
    const todoList = document.getElementById("todo-list");
    todoList.appendChild(listItem);
    
    taskInput.value = "";
    
    document.getElementById("taskCount").textContent = `(${todoList.children.length} tasks)`;
    
    console.log("task added:", taskText);
    console.log("total tasks:", todoList.children.length);
    
    listItem.addEventListener('click', function() {
        toggleTask(this);
    });
}
//_______________________________________________________________________________________________________________________

console.log("PART E: TASK STATE MANAGEMENT");

function toggleTask(taskElement) {

    taskElement.classList.toggle('done');
    
    const todoList = document.getElementById("todo-list");
    const total = todoList.children.length;
    const completed = todoList.querySelectorAll('.done').length;
    
    console.log("total:", total, "completed:", completed);
}