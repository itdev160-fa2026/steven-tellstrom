//______________________________________________________________________________________
// Part A (DOM Selection Demonstrations)

console.log("---> Part A: DOM Selection Demonstrations");

//select elements by ID

//getElementById (selects a single element by its ID)
const greetingMessage = document.getElementById("greeting-message");
const greetingImage = document.getElementById("greeting-image");
const nameInput = document.getElementById("nameInput");

console.log("greetingMessage:", greetingMessage);
console.log("greetingImage:", greetingImage);
console.log("nameInput:", nameInput);

//querySelector (selects the first matching element)
const cardContainer = document.querySelector(".card-container");
const controls = document.querySelector(".controls");

console.log("cardContainer (by class):", cardContainer);
console.log("controls (by class):", controls);

//querySelectorAll (select multiple elements)
const allButtons = document.querySelectorAll("button"); //querySelectorAll

console.log("All buttons:", allButtons);
const buttonElements = document.querySelectorAll(".card-container h3");

console.log("All button elements:", buttonElements);




//______________________________________________________________________________________
// part B (content Modification)

console.log("\n---> Part B: Content Modification");

greetingMessage.textContent = "<b>textContent</b>"; //text content does not render html

console.log("greetingMessage.textContent:", greetingMessage.textContent);

greetingMessage.innerHTML = "<b>This is innerHTML</b>"; //inner html renders html

console.log("greetingMessage.innerHTML:", greetingMessage.innerHTML);

//changing greeting dynamically (opposed to above greeting message being static)
function setGreeting(msg) 
{
    greetingMessage.textContent = msg;

    console.log("Greeting changed to:", msg);
}

setGreeting("Greetings!");



//______________________________________________________________________________________
// Part C: Attribute Modification

console.log("\n--->Part C: Attribute Modification");

const greetings = 
{
    birthday: 
    {
        message: "Happy Birthday!",
        image: "https://picsum.photos/id/959/300/200?text=Happy+Birthday!",
        alt: "Happy Birthday greeting"
    },
    holiday: 
    {
        message: "Happy Holidays!",
        image: "https://picsum.photos/id/660/300/200?text=Happy+Holidays!",
        alt: "Happy Holidays greeting"
    },
    thankYou: 
    {
        message: "Thank You!",
        image: "https://picsum.photos/id/360/300/200?text=Thank+You!",
        alt: "Thank you greeting"
    },
    welcome: 
    {
        message: "Welcome!",
        image: "https://picsum.photos/id/1062/300/200?text=Welcome",
        alt: "Welcome greeting"
    }
};

//getAtrritube (to set attribute value)
console.log("Current image src:", greetingImage.getAttribute("src")); //getAttribute (to read current attribute value) ... (src = source url)

greetingImage.setAttribute("alt", greetings.welcome.alt); // changing alt text
greetingImage.setAttribute("title", "Greeting Card Image");

//setAttribute (to set attribute value)
console.log("Image src after setAttribute:", greetingImage.getAttribute("src"));
console.log("Image alt after setAttribute:", greetingImage.getAttribute("alt"));
console.log("Image title after setAttribute:", greetingImage.getAttribute("title"));

//removeAttribute (to remove attribute)
greetingImage.removeAttribute("title");

console.log("Image title after removeAttribute:", greetingImage.getAttribute("title"));




//______________________________________________________________________________________
// Part D: Dynamic Greeting Card Functions

console.log("\n---> Part D: Dynamic Greeting Card Functions");

//functions to change greeting messages and images (from greetings function)
function setBirthdayGreeting() 
{
    greetingMessage.textContent = greetings.birthday.message;
    greetingImage.src = greetings.birthday.image;
    greetingImage.alt = greetings.birthday.alt;

    console.log("Set to Birthday greeting"); //displays when clicked
}

function setHolidayGreeting() 
{
    greetingMessage.textContent = greetings.holiday.message;
    greetingImage.src = greetings.holiday.image;
    greetingImage.alt = greetings.holiday.alt;

    console.log("Set to Holiday greeting");
}

function setThankYouGreeting() 
{
    greetingMessage.textContent = greetings.thankYou.message;
    greetingImage.src = greetings.thankYou.image;
    greetingImage.alt = greetings.thankYou.alt;

    console.log("Set to Thank You greeting");
}

function setRandomGreeting() 
{
    const keys = Object.keys(greetings); //gets all keys from greetings object
    const randomKey = keys[Math.floor(Math.random() * keys.length)]; //selects random key from greetings
    const randomGreeting = greetings[randomKey]; //uses the random key to select random greeting
    greetingMessage.textContent = randomGreeting.message; //sets message to random greeting message and so on below...
    greetingImage.src = randomGreeting.image;
    greetingImage.alt = randomGreeting.alt;

    console.log("Set to random greeting:", randomKey); 
}

//______________________________________________________________________________________
// Part E: Interactive Features

console.log("\n---> Part E: Interactive Features");

function personalizeGreeting()
{
    const name = nameInput.value.trim();
    if (name) //ensure name is not empty 
    {
        greetingMessage.textContent = `Greetings ${name}!`;

        console.log("Greeting for:", name);
    } 
    else 
    {
        greetingMessage.textContent = "Greetings!"; //default if no name entered

        console.log("Greeting: Greetings!");
    }
}