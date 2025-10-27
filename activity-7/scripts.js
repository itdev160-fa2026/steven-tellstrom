// Steven Tellstrom, ITDEV-160, 10-19-2025
// Activity 7: Product Catalog Display

console.log("----- Activity 7: Product Catalog Display -----");

//_______________________________________________________________________________________________________________________

// a : array and object demos

console.log("\n----- ARRAY DEMONSTRATIONS -----");

// different array creation methods

const numbersArray = [0, 1, 2, 3, 4];
const animalArray = new Array('duck', 'cat', 'bird');
const mixedArray = [122, 'hello', 'world', true, null, {name: 'Steven'}];
const boolArray = [true, false, true, true];

console.log("Numbers array: ", numbersArray);
console.log("Animal Array: ", animalArray);
console.log("Mixed Array: ", mixedArray);
console.log("Boolean Array: ", boolArray);

// different array methods ---> push(), pop(), shift(), unshift()

const companies = ['Apple', 'Microsoft', 'Nvidia']
console.log("Original Companies:", companies)

// push
companies.push('Google');
console.log("After push('Google'):", companies);

// pop
const removedCompany = companies.pop(); 
console.log("After pop():", companies, "- removed:", removedCompany);

// shift

const firstCompany = companies.shift();
console.log("After shift():", companies, "- removed:", firstCompany);

// unshift
companies.unshift('Meta'); 
console.log("After unshift('Meta'):", companies);

// array iteration

console.log("\nArray Iteration Methods:");
const grades = [40, 93, 78, 96, 88];

console.log("For loop:");
for (let i = 0; i < grades.length; i++) {
    console.log(`Position ${i}: ${grades[i]}`);
}

console.log("For...of loop:"); //modren way to iterate over the values of an iterateble obj
for (const grade of grades) {
    console.log(`Score: ${grade}`);
}

console.log("forEach() method:");
grades.forEach((grade, position) => {
    console.log(`forEach - Position ${position}: ${grade}`);
});

console.log("map() method (add 10 points bonus):");
const bonusGrades = grades.map(grade => grade + 10);
console.log("Bonus grades:", bonusGrades);

console.log("filter() method (grades above 80 only):");
const highGrades = grades.filter(grade => grade > 80);
console.log("High grades:", highGrades);

console.log("\n----- OBJECT DEMONSTRATIONS -----");

// create object using literal notation (object literal notation = syntax that lets you create an object in one line by using curly braces)

const employee = 
{
    fullName: 'Steven Tellstrom',
    program: 'IT Web and Software Developer',
    age: 26,
    location: 'Milwaukee',
    isActive: true
};

console.log("Employee object:", employee);

// property access methods
console.log("(Dot notation) Name:", employee.fullName);
console.log("(Bracket notation) Program:", employee['program']);

// dynamic property access
const field = 'age';
console.log(`Dynamic access (${field}):`, employee[field]);

// add, modify, and delete properties
employee.email = 'tellstrs@matc.edu';  // add
employee.age = 96; // modify
delete employee.location; // delete

console.log("After changes:", employee);

//_______________________________________________________________________________________________________________________

// b : product data structure

console.log("\n----- PRODUCT DATA STRUCTURE -----");

// all images from pexels
const inventory = [
    {
        id: 101, //can't start with 0 "e.g. 001" because octal literals not allowed
        name: "Sansevieria \"Snake Plant\"",
        description: "Low maintenance succulent with tall, swordlike leaves that pures the air and likes low light conditions.",
        price: 24.99,
        category: "Succulent",
        image: "images/snake_plant.jpg"
    },
    {
        id: 102,
        name: "Blue Columnar Cactus",
        description: "Striking blue tinted columnar cactus that grows upright, perfect for desert gardens.",
        price: 34.99,
        category: "Succulent",
        image: "images/blue_columnar_cactus.jpg"
    },
    {
        id: 103,
        name: "Chinese Evergreen",
        description: "Beautiful foliage plant with colorful leaves in shades of green, pink, and silver.",
        price: 29.99,
        category: "Houseplants",
        image: "images/chinese_evergreen.jpg"
    },
    {
        id: 104,
        name: "Sunflower",
        description: "Bright yellow flower, perfect for gardens and cut flower arrangements.",
        price: 4.99,
        category: "Flowering",
        image: "images/sunflower.jpg"
    },
    {
        id: 105,
        name: "Pothos",
        description: "Trailing vine with heart shaped leaves, great for beginners and hanging baskets.",
        price: 16.99,
        category: "Vines",
        image: "images/pothos.jpg"
    }
];

console.log(`Loaded ${inventory.length} items in inventory:`, inventory);

console.log("\nAccessing product data:");
console.log("First item name:", inventory[0].name);
console.log("Second item price:", inventory[1].price);
console.log("Third item category:", inventory[2]['category']);

console.log("\nFiltering and searching examples:");

const succulentItems = inventory.filter(item => item.category === 'Succulent');
console.log("Succulent items:", succulentItems);

const budgetItems = inventory.filter(item => item.price < 25);
console.log("Budget items (under $25):", budgetItems);

const plantNames = inventory.map(item => item.name);
console.log("All plant names:", plantNames);

const pricesWithTax = inventory.map(item => (item.price * 1.10).toFixed(2));
console.log("Prices with 10% tax:", pricesWithTax);

const totalValue = inventory.reduce((sum, item) => sum + item.price, 0);
console.log("Total inventory value:", totalValue.toFixed(2));

const averagePrice = totalValue / inventory.length;
console.log("Average plant price:", averagePrice.toFixed(2));

const mostExpensive = inventory.reduce((max, item) => 
    item.price > max.price ? item : max
);
console.log("Most expensive plant:", mostExpensive.name, "$" + mostExpensive.price);

//_______________________________________________________________________________________________________________________

// c : product display functions

console.log("\n----- PRODUCT DISPLAY FUNCTIONS -----");

// create html for individual product cards (simple way)
function createProductCard(plant) {
    
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const image = document.createElement('img');
    image.src = plant.image;
    image.alt = plant.name;
    image.className = 'product-image';
    
    const info = document.createElement('div');
    info.className = 'product-info';
    
    const title = document.createElement('h3');
    title.textContent = plant.name;
    
    const description = document.createElement('p');
    description.textContent = plant.description;
    
    const price = document.createElement('div');
    price.className = 'product-price';
    price.textContent = '$' + plant.price.toFixed(2);
    
    const category = document.createElement('span');
    category.className = 'product-category';
    category.textContent = plant.category;
    
    info.appendChild(title);
    info.appendChild(description);
    info.appendChild(price);
    info.appendChild(category);
    
    card.appendChild(image);
    card.appendChild(info);
    
    return card;
}

// display entire catalog
function displayProducts(plantsToShow) {
    const grid = document.getElementById('product-grid');
    
    grid.innerHTML = '';
    
    if (plantsToShow.length === 0) 
    {
        const message = document.createElement('div');
        message.textContent = 'No plants found';
        grid.appendChild(message);
        return;
    }
    
    plantsToShow.forEach(plant => {
        const card = createProductCard(plant);
        grid.appendChild(card);
    });
    
    updateResultsCount(plantsToShow.length);
}

function updateResultsCount(count) {
    const display = document.getElementById('resultsCount');
    if (display)   
    {
        display.textContent = 'Showing ' + count + ' of ' + inventory.length + ' plants';
    }
}

console.log("Product display functions created successfully!");

//_______________________________________________________________________________________________________________________

// d : search and filter features

console.log("\n----- SEARCH AND FILTER FEATURES -----");

function searchPlants(searchWord) {
    // if no search word, show all plants
    if (!searchWord || searchWord === '') 
    {
        return inventory;
    }
    
    const lowerSearchWord = searchWord.toLowerCase();
    
    // look through all plants
    const foundPlants = [];
    for (let i = 0; i < inventory.length; i++) 
    {
        const plant = inventory[i];
        const plantName = plant.name.toLowerCase();
        const plantDescription = plant.description.toLowerCase();
        
        // check if search word is in name or desc.
        if (plantName.includes(lowerSearchWord) || plantDescription.includes(lowerSearchWord))
        {
            foundPlants.push(plant);
        }
    }
    
    return foundPlants;
}

function filterByCategory(plants, category) {

    if (category === 'all') 
    {
        return plants;
    }
    
    const matchingPlants = [];
    for (let i = 0; i < plants.length; i++) 
    {
        if (plants[i].category === category) 
        {
            matchingPlants.push(plants[i]);
        }
    }
    
    return matchingPlants;
}

function applyFilters() {
 
    const searchBox = document.getElementById('searchInput');
    const searchWord = searchBox.value;
    
    const categoryDropdown = document.getElementById('categoryFilter');
    const selectedCategory = categoryDropdown.value;
    
    let filteredPlants = searchPlants(searchWord);
    
    filteredPlants = filterByCategory(filteredPlants, selectedCategory);
    
    displayProducts(filteredPlants);
}

function clearFilters() 
{
    
    const searchBox = document.getElementById('searchInput');
    searchBox.value = '';
    
    const categoryDropdown = document.getElementById('categoryFilter');
    categoryDropdown.value = 'all';
    
    displayProducts(inventory);
}

function init() 
{

    const searchBox = document.getElementById('searchInput');
    searchBox.addEventListener('input', applyFilters);
    
    const categoryDropdown = document.getElementById('categoryFilter');
    categoryDropdown.addEventListener('change', applyFilters);
    
    const clearButton = document.getElementById('clearFiltersBtn');
    clearButton.addEventListener('click', clearFilters);
    
    displayProducts(inventory);
}

document.addEventListener('DOMContentLoaded', init);