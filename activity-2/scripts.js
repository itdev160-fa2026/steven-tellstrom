// Steven Tellstrom, ITDEV-160, 9-7-2025
// Activity 2 : Operators and Control Flow

let barrier = "|=====================================================================|";

//_______________________________________________________________________________________________________________________
console.log(barrier);
console.log("Part A : Arithmetic Operators");
console.log(barrier);

//Create variables to demonstrate each arithmetic operator (+, -, *, /, %)
//Log the results to the console with descriptive labels
//Show examples of operator precedence

let a = 1;
let b = 2;

console.log("\n---   arithmetic operators examples   ---")
console.log("add 1+2: " + (a+b));
console.log("subtract 1-2: " + (a-b));
console.log("multiply 1*2: " + (a*2));
console.log("divide 1/2: " + (1/2));
console.log("modulas 1%2: " + (1%2));
console.log("\n---   precedence examples   --- ")
console.log("below shows the precedence notation, then the output to the right.");
console.log("parentheses first, the left to right for * and / : (1+1) * 2 / 2 = " + (a+a)*b/b);
console.log("modulas and * have same presedence so left to right : 10 % 3 * 5 = " + (10 % 3 * 5));
console.log("adding first (parentheses), then multiply left to right : 5*5*(2+2) = " + 5*5*(2+2));
console.log("");

//_______________________________________________________________________________________________________________________

console.log(barrier);
console.log("Part B : Comparison Operators");
console.log(barrier);

//Create examples using ==, ===, !=, !==, >, <, >=, <=
//Demonstrate the difference between == and ===
//Log the results to the console

let c = 25;
let d = "100";
let e = 100;

console.log("\n---   examples using ==, ===, !=, !==, >, <, >=, <=   ---");

console.log(`c = ${c} (number), d = "${d}" (string), e = ${e} (number)`);  // ` (backticks) create template literal and "${d}" part puts literal quote marks around value d in output.

console.log(`d >= e: ${d >= e}`);                                         //  $ expression start ... {    } expression container 
console.log(`c !== d: ${c !== d}`);
console.log(`c < e: ${c < e}`);
console.log(`e > c: ${e > c}`);
console.log(`d === c: ${d === c}`);
console.log(`e != c: ${e != c}`);
console.log(`e <= c: ${e <= c}`);
console.log(`c == d: ${c == d}`);

console.log("\n--- difference between == and === ---\n");

console.log("loose equality (auto coercion, unpredictable):");
console.log(`c == "25": ${c == "25"} (number 25 vs string "25")`);

console.log("strict equality (compares both types AND values. predictable):");
console.log(`c === "25": ${c === "25"} (number vs string - different types)`);
//_______________________________________________________________________________________________________________________

console.log("");
console.log(barrier);
console.log("Part C : Logical Operators (Weather Checker");
console.log(barrier);

let isCloudy = false;
let isSunny = true;
let temperature = 75;

//Create examples using && (AND), || (OR), and ! (NOT)
//Show truth tables for each operator GO BACK AND DO THIS
//Log the results to the console

console.log(`\nsCloudy = ${isCloudy}, isSunny = ${isSunny}, temperature = ${temperature}`);
console.log(`isCloudy && isSunny: ${isCloudy && isSunny} (&& AND --- can't be both cloudy and sunny)`);
console.log(`isCloudy || isSunny: ${isCloudy || isSunny} (|| OR --- at least one weather condition is true)`);
console.log(`!isCloudy: ${!isCloudy} (! NOT --- opposite of isCloudy)`);
console.log(`temperature > 70 && !isCloudy: ${temperature > 70 && !isCloudy} (warm and not cloudy)`);
console.log(`isSunny || temperature > 80: ${isSunny || temperature > 80} (either sunny OR hot)`);

console.log("\n---   truth table demonstration   ---");

console.log("OR (||) truth table:");
console.log(`true || true = ${true || true}`);
console.log(`true || false = ${true || false}`);
console.log(`false || true = ${false || true}`);
console.log(`false || false = ${false || false}`);

console.log("\nAND (&&) truth table:");
console.log(`true && true = ${true && true}`);
console.log(`true && false = ${true && false}`);
console.log(`false && true = ${false && true}`);
console.log(`false && false = ${false && false}`);

console.log("\nNOT (!) truth table:");
console.log(`!true = ${!true}`);
console.log(`!false = ${!false}\n`);

//_______________________________________________________________________________________________________________________

console.log("");
console.log(barrier);
console.log("Part D : Basic Conditional Statements (Distance Tracker)");
console.log(barrier);

//Create simple if, else if, and else statements
//Use different comparison operators in conditions
//Display results in both console and on the webpage ⭐⭐⭐

let miles = 100;

console.log(`\nDistance from destination: ${miles} miles`);
if (miles >= 1000) {
    console.log("You have a long journey ahead.");
} else if (miles >= 500) {
    console.log("You are far from your destination.");
} else if (miles >= 100) {
    console.log("You are still a bit from to your destination");
} else if (miles >= 10) {
    console.log("You are approaching your destination.")
} else if (miles >= 1){
    console.log("Almost there! Keep Going!")
} else if (miles == 0) {
    console.log("You've arrived at your destination!")
}

document.getElementById("output").innerHTML = 
    `(Results from Part D: Basic Conditional Statements:)<br> <br> Distance from destination: ${miles} miles`;

//_______________________________________________________________________________________________________________________
console.log("");
console.log(barrier);
console.log("Part E : Switch Statement Demo (Day of the Week)");
console.log(barrier);

//Create a switch statement that evaluates a day of the week
//Include default case handling
//Log the results to the console

let dayNumber = 3;
console.log(`\nDay number: ${dayNumber}`);
switch (dayNumber) {
  case 1:
    console.log("Monday");
    break;
  case 2:
    console.log("Tuesday");
    break;
  case 3:
    console.log("Wednesday");
    break;
  case 4:
    console.log("Thursday");
    break;
  case 5:
    console.log("Friday");
    break;
  case 6:
    console.log("Saturday");
    break;
  case 7:
    console.log("Sunday");
    break;
  default:
    console.log("Invalid day");
}

console.log("");

//_______________________________________________________________________________________________________________________

console.log(barrier);
console.log("Part F : Age Checker Application");
console.log(barrier);
console.log("\nResults displayed in the result div on webpage");

//Create a function called checkAge() that will be called by the button
//Retrieve the value from the age input field using document.getElementById()
//Use conditional statements to determine:
    //If input is not a number: "Invalid age - please enter a number"
    //If age < 0 or age > 150: "Invalid age - please enter a realistic age"
    //If age < 18: "You are a minor"
    //If age >= 18: "You are an adult"
//Display the result in the result div on the webpage
//Handle edge cases and provide user-friendly messages

function checkAge() {

  const input = document.getElementById("ageInput");
  const resultDiv = document.getElementById("result");
  const inputValue = ageInput.value.trim();

  console.log(`User input: "${inputValue}"`);

  resultDiv.className = "";

  if (inputValue === "") {
    resultDiv.textContent = "Enter your age";
    resultDiv.className = "invalid";
    console.log("Result: no input added!");
    return;
  }

  const age = Number(inputValue);

  if (isNaN(age)) {
    resultDiv.textContent = "Invalid age, please enter a number 1-150";
    resultDiv.className = "invalid";
    return;
  }



  if (age <= 18) {
    resultDiv.textContent = `You are a minor`;
    resultDiv.className = "minor";
  } else {
    resultDiv.textContent = `You are an adult`;
    resultDiv.className = "adult";
  }

    if (age < 0 || age > 150) {
    resultDiv.textContent = "Invalid age, please enter again";
    resultDiv.className = "invalid";
    return;
  }

}