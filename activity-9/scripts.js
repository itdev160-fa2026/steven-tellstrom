// Steven Tellstrom, ITDEV-160, activity 9 (contact form validations)

//_______________________________________________________________________________________________________________________

// part a: form access demo

var myForm = document.getElementById('contactForm');

function tryFormAccess() {
    console.log("Different ways to get the form:");
    
    var formByNumber = document.forms[0];
    console.log("First form on page:", formByNumber);

    // (better way V)
    var formByName = document.getElementById('contactForm');
    console.log("Form by id:", formByName);
    
    console.log("Are the forms the same?", formByNumber === formByName);
}

function tryElementAccess() {
    console.log("\nGetting form elements:");
    //form elements collection
    var nameBox = myForm.elements['name'];
    console.log("Name input:", nameBox);
    
    //normal way with getElementById
    var emailBox = document.getElementById('email');
    console.log("Email input:", emailBox);
    
    var allElements = myForm.elements;
    console.log("Total elements:", allElements.length);
}

function playWithValues() {
    console.log("\nPlaying with form values:");
    
    //get whatever the user typed in (probably nothing at first)
    var nameValue = myForm.name.value;
    var emailValue = myForm.email.value;
    
    console.log("Current name:", nameValue);
    console.log("Current email:", emailValue);
    
    //putting text in same field to test
    myForm.name.value = "<Enter Name Here>";
    console.log("Name changed to:", myForm.name.value);
}

    //properties of form elements
function checkProperties() {
    console.log("\nChecking element info:");
    
    var nameInput = document.getElementById('name');
    console.log("Name input type:", nameInput.type);
    console.log("Name input name:", nameInput.name);
    
    //check options in dropdown
    var dropdown = document.getElementById('subject');
    console.log("Dropdown has", dropdown.options.length, "choices");
}

//_______________________________________________________________________________________________________________________

// part b: form event handling

    //set up listeners to watch what user does
function watchFormEvents() {
    console.log("\nWatching for form events...");
    
    var theForm = document.getElementById('contactForm');
    var nameInput = document.getElementById('name');
    var emailInput = document.getElementById('email');
    
    theForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log("Someone tried to submit");
        console.log("Current name:", nameInput.value);
        console.log("Current email:", emailInput.value);
    });
    
    nameInput.addEventListener('input', function(e) {
        console.log("Typing in name box:", e.target.value);
        var nameLength = e.target.value.length;
        if (nameLength < 2) {
            console.log("Name needs more letters");
        }
    });
    
    emailInput.addEventListener('input', function(e) {
        console.log("Typing in email box:", e.target.value);
        var hasAtSign = e.target.value.includes('@');
        if (!hasAtSign) {
            console.log("Email missing @ symbol");
        }
    });
    
    nameInput.addEventListener('blur', function(e) {
        console.log("User left name field with:", e.target.value);
    });
}

//_______________________________________________________________________________________________________________________

// part c: validation functions

function isNameGood(nameText) {
    if (nameText.length < 2) {
        return 'Name needs at least 2 letters';
    }
    return '';
}

function isEmailGood(emailText) {
    var hasAt = emailText.includes('@');
    var hasDot = emailText.includes('.');
    
    if (!hasAt) {
        return 'Email needs @';
    }
    if (!hasDot) {
        return 'Email needs . (dot)';
    }
    return '';
}

function isMessageGood(messageText) {
    if (messageText.length < 10) {
        return 'Message needs 10+ chars';
    }
    return '';
}

function isSubjectGood(subjectValue) {
    if (subjectValue === '') {
        return 'Please choose subject';
    }
    return ''; //no error.
}

//_______________________________________________________________________________________________________________________

// part d: show errors

function displayError(fieldName, errorText) {
    //find error div for this field
    var errorSpot = document.getElementById(fieldName + 'Error');
    errorSpot.textContent = errorText;
    
    //shows error if there is one, hides if empty
    if (errorText !== '') {
        errorSpot.style.display = 'block';
    } else {
        errorSpot.style.display = 'none';
    }
}

    //real time validation
function startValidation() {
    var nameBox = document.getElementById('name');
    var emailBox = document.getElementById('email');
    var subjectBox = document.getElementById('subject');
    var messageBox = document.getElementById('message');
    
    nameBox.addEventListener('input', function() {
        var errorMsg = isNameGood(this.value);
        displayError('name', errorMsg);
        
        if (errorMsg) {
            this.className = 'invalid'; //red border
        } else {
            this.className = 'valid'; //green border
        }
    });
    
    emailBox.addEventListener('input', function() {
        var errorMsg = isEmailGood(this.value);
        displayError('email', errorMsg);
        
        if (errorMsg) {
            this.className = 'invalid';
        } else {
            this.className = 'valid';
        }
    });
    
    subjectBox.addEventListener('change', function() {
        var errorMsg = isSubjectGood(this.value);
        displayError('subject', errorMsg);
    });
    
    messageBox.addEventListener('input', function() {
        var errorMsg = isMessageGood(this.value);
        displayError('message', errorMsg);
        
        if (errorMsg) {
            this.className = 'invalid';
        } else {
            this.className = 'valid';
        }
    });
}

function isEverythingValid() {
    //validate each field ...
    var nameCheck = isNameGood(document.getElementById('name').value);
    var emailCheck = isEmailGood(document.getElementById('email').value);
    var subjectCheck = isSubjectGood(document.getElementById('subject').value);
    var messageCheck = isMessageGood(document.getElementById('message').value);

    //all empty strings
    if (nameCheck === '' && emailCheck === '' && subjectCheck === '' && messageCheck === '') {
        return true;
    } else {
        return false;
    }
}

//_______________________________________________________________________________________________________________________

// part e: form submission

function handleSubmission() {
    var theForm = document.getElementById('contactForm');
    
        //listens for submit button click
    theForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        var formIsValid = isEverythingValid();
        
        if (formIsValid) {
            console.log("All fields look good!");
            
            //collect all form data
            var submittedData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            console.log("Form data:", submittedData);
            
            var statusArea = document.getElementById('formStatus');
            statusArea.textContent = 'Message was sent!';
            statusArea.style.display = 'block';

            theForm.reset();
        } else {
            console.log("fix errors!");
        }
    });
}

document.addEventListener('DOMContentLoaded', function() 
{
    tryFormAccess();
    tryElementAccess();
    playWithValues();
    checkProperties();
    
    watchFormEvents();
    startValidation();
    handleSubmission();
});