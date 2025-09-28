/* Steven Tellstrom 9/28/25 ITDEV160 */

console.log("|----- PART A: EVENT HANDLING DEMONSTRATIONS -----|")

// get references to HTML element by id
const input1 = document.getElementById("number1");
const input2 = document.getElementById("number2");
const opButtons = document.querySelectorAll(".operation");
const result = document.getElementById("result");

console.log("Elements found:", input1, input2, opButtons, result);

let demoBtn = document.createElement("button");
demoBtn.textContent = "Demo Button";
demoBtn.className = "btn"; // for css styling

demoBtn.style.backgroundColor = "red";
demoBtn.style.color = "white";

console.log("\n----- addEventListener vs onclick -----");

demoBtn.addEventListener('click', function(event) //allows multiple listeners (can attach more than one function to the same event)
{
    console.log("You have clicked:", event.type);
});

demoBtn.onclick = function(event) 
{ //onclick property, only allows one handler
    console.log("onclick method:", event.type); //this would overwrite any previous onclick
};

console.log("\n----- Different event type -----");

demoBtn.addEventListener('click', function(event) {
    let eventType = event.type;
    let targetText = event.target.textContent;
    
    console.log("Event:", eventType);
    console.log("Target:", targetText);
});

demoBtn.addEventListener('mouseover', function() //mouseover triggers when mouse hover over button 
{
    console.log("Mouse over");
});

demoBtn.addEventListener('mouseout', function()  //mouseout triggers when mouse leaves element
{
    console.log("Mouse out");
});

document.getElementById("output").appendChild(demoBtn); //add demo button to webpage

/*__________________________________________________________________________________________*/
/* PART B: EVENT OBJECT EXPLORATION*/

console.log("|----- PART B: EVENT OBJECT EXPLORATION -----|");

//helper function
function logEventDetails(event) {
  console.log("Event Details:");
  console.log("- Type:", event.type);
  console.log("- Target:", event.target);
  console.log("- Target tagName:", event.target.tagName);
  console.log("- Target textContent:", event.target.textContent);
  console.log("- CurrentTarget:", event.currentTarget);
}

let eventDiv = document.createElement("div");

eventDiv.textContent = "Demo Button 2";
eventDiv.className = "btn";
eventDiv.style.backgroundColor = "red";
eventDiv.style.color = "white";
eventDiv.style.padding = "15px 20px";
eventDiv.style.fontSize = "16px";
eventDiv.style.fontWeight = "bold";
eventDiv.style.margin = "5px";
eventDiv.style.display = "inline-block"; 

console.log("\n----- event.target identification -----");
eventDiv.addEventListener('click', function(event) 
{
    let targetElement = event.target;
    let targetText = event.target.textContent;
    
    console.log("event.target:", targetElement); //display dom element
    console.log("target text:", targetText); //showing how to get information from event object
});

console.log("\n----- event properties -----"); 
eventDiv.addEventListener('click', function(event)
{
    logEventDetails(event);  //call helper function for logging
});

console.log("\n----- getting info from events -----");
input1.addEventListener('input', function(event)
{
    let inputValue = event.target.value;
    console.log("input value:", inputValue);
    logEventDetails(event);  //log detailed info for input events too
});

console.log("\n----- simple event patterns -----");

//adding identical event handlers to multiple similar elements.
opButtons.forEach(function(button) 
{
    button.addEventListener('click', function(event) 
    {
        let buttonText = event.target.textContent;
        console.log("clicked:", buttonText);
        logEventDetails(event);
    });
});

document.getElementById("output").appendChild(eventDiv);

/*__________________________________________________________________________________________*/
/* PART C: INPUT VALIDATION AND MATH OPERATIONS*/

console.log("|----- PART C: INPUT VALIDATION AND MATH OPERATIONS -----|");

console.log("\n----- Math functions -----");

function add(x, z) 
{
    return x + z;
}

function subtract(x, z) 
{
    return x - z;
}

function multiply(x, z) 
{
    return x * z;
}

function divide(x, z) 
{
    if (z === 0) return "ERROR: CANT DIVIDE BY ZERO";
    return x / z;
}

console.log("\n----- Input validation -----");

function getNumbers() {
    let x = parseFloat(input1.value);
    let z = parseFloat(input2.value);
    
    let value1 = input1.value;
    let value2 = input2.value;
    
    if (value1 === "" || value2 === "") 
    {
        return { error: "ERROR: FILL IN BOTH  FIELDS" };
    }
    
    if (isNaN(x) || isNaN(z)) 
    {
        return { error: "ERROR: ONE NUMBER PLEASE" };
    }
    
    return { x, z };
}

console.log("\n----- Display results -----");

function showResult(value) {
    let displayValue = value;
    result.textContent = displayValue;
    console.log("Result:", displayValue);
}




/*__________________________________________________________________________________________*/
/* PART D: USER INTERFACE INTERACTIONS*/

console.log("|----- PART D: USER INTERFACE INTERACTIONS -----|");

function calculate(operation) 
{
    console.log("Operation:", operation); //log which operation was requested
    
    result.className = "result"; //clear previous result
    
    let numbers = getNumbers(); //using part c validation
    
    if (numbers.error) 
    {
        result.textContent = numbers.error;
        result.className = "result error";
        return; //exits if validation fails
    }
    
    let { x, z } = numbers;
    let answer;
    
    switch(operation) 
    {
        case "add": 
            answer = add(x, z);
            break;

        case "subtract": 
            answer = subtract(x, z);
            break;

        case "multiply": 
            answer = multiply(x, z);
            break;

        case "divide":
            if (z === 0) 
            {
                result.textContent = "ERROR: CAN'T DIVIDE BY ZERO";
                result.className = "result error";
                return; //exit function to stop division
            }
            answer = divide(x, z);
            break;
    }

    result.textContent = "Result: " + answer;
    result.className = "result success";
}

console.log("\n----- Visual Feedback -----");

opButtons.forEach(function(button) 
{
    button.addEventListener("mousedown", function() 
    {
        button.style.transform = "scale(0.9)";
    });
    
    button.addEventListener("mouseup", function() 
    {
        button.style.transform = "scale(1)";
    });
    
    button.addEventListener("mouseleave", function() 
    {
        button.style.transform = "scale(1)";
    });
    
    button.addEventListener("click", function() 
    {
        console.log(button.textContent + " clicked");
        calculate(button.dataset.operation);
    });
});

console.log("\n----- Clear button -----");
//event listener to clear button for resetting calculator
document.getElementById('clear').addEventListener("click", function() 
{
    console.log("clear clicked");
    
    let clearButton = this;
    clearButton.style.transform = "scale(0.9)";
    
    input1.value = "";
    input2.value = "";
    result.textContent = "Ready for calculation";
    result.className = "result";
});