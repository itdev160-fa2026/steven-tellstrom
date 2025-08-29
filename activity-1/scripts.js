//console hello world
console.log("Hello World!");

//webpage hello world
document.getElementById("output").innerHTML = "<b>Hello, World!</b>";

let studentName = "Steven";
const age = 26;
let isStudent = true;
let emptyValue = null;
let notAssigned;

console.log("-----VARIABLE VALUES-----");
console.log("Student Name: ", studentName);
console.log("Age: ", age);
console.log("Is Student: ", isStudent);
console.log("Empty Value: ", emptyValue);
console.log("Not Assigned: ", emptyValue);

console.log("-----VARIABLES TYPES-----");
console.log("typeof studentName: ", typeof studentName); //string
console.log("typeof age: ", typeof age); //number
console.log("typeof isStudent: ", typeof isStudent); //boolean
console.log("typeof emptyValue: ", typeof emptyValue); //object
console.log("typeof notAssigned: ", typeof notAssigned); //undefined

console.log("-----VARIABLE REASSIGNMENT-----");
console.log("Original studentName: ", studentName);
studentName = "Alex";
console.log("New studentName: ", studentName);
age = 99; //uncaught TypeError: invalid assignment to const 'age'. (cannot change constant variable type)