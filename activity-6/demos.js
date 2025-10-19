// Steven Tellstrom, ITDEV-160, Activity 6 Interactive To-Do List (Enhanced) 10/19/2025


//_______________________________________________________________________________________________________________________


console.log("-----> PART A: FUNCTION DEMONSTRATIONS <->----");

console.log("\n-----> Function Declarations vs Expressions examples <-----");

//FUNCTION DECLERATION ('HOISTED' -> can call before definition, defined at parse time (before code runs))
function addNum(x, y) 
{
    return x + y;
}

//FUNCTION EXPRESSION (not hoisted - must call after defined.)
const multNum = function(x, y) 
{
    return x * y;
};

console.log("Declaration:", addNum(9, 122));
console.log("Expression:", multNum(5, 10));


//_______________________________________________________________________________________________________________________

//parameters, return Values and arguments
console.log("\n-----> Parameters, Return Values and Arguements <-----");

function greetings(name, age) //name, age are PARAMETERS
{  
    console.log("Parameters:", name, age);
    return `${name}, you are ${age} yrs old!`;
}

const message = greetings("Steven", 26);  //"Steven", 26 are ARGUMENTS
console.log("Returned:", message);


//_______________________________________________________________________________________________________________________

//show Local vs Global Scopes
console.log("\n-----> Local vs Global Scope <-----");

let globalVar = "I'm global";

function scopeTester() 
{
    let localVar = "I'm local";
    console.log("Inside function - Global:", globalVar); 
    console.log("Inside function - Local:", localVar); 
    return localVar; //only accessible in local scope
}

console.log("Before function - Global:", globalVar); //accesible anywhere in code (out of scope)
scopeTester();
console.log("After function - Global:", globalVar);

//_______________________________________________________________________________________________________________________

//arrow Functions
console.log("\n----> Arrow Function <----");

const double = x => x * 2; //shorter version

console.log("Arrow function double(7):", double(7));

//_______________________________________________________________________________________________________________________