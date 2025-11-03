// Steven Tellstrom, ITDEV-160, 10-28-2025
// activity 8: quote of the day generator (demos) 

console.log("----- Activity 8: JavaScript Demos -----");

//_______________________________________________________________________________________________________________________

// part a : asynchronous javascript demonstration

console.log("\n----- ASYNC DEMO -----");

function demonstrateSetTimeout() {
    console.log("Demonstrating setTimeout ...");
    setTimeout(function() { console.log("After 1 second"); }, 1000);
    setTimeout(function() { console.log("After 2 seconds"); }, 2000);
    console.log("This runs immediately");
}

function demonstrateSyncVsAsync() {
    console.log("Demonstrating sync vs async ...");
    console.log("Sync: Step 1");
    console.log("Sync: Step 2");
    setTimeout(function() { console.log("Async: Step 4"); }, 1000);
    console.log("Sync: Step 3");
}

function demonstratePromises() {
    console.log("Demonstrating promises ...");
    
    var simplePromise = new Promise(function(resolve, reject) {
        setTimeout(function() { resolve("Promise worked!"); }, 500);
    });

    simplePromise
        .then(function(result) { console.log("Promise result:", result); })
        .catch(function(error) { console.log("Promise error:", error); });

    var rejectPromise = new Promise(function(resolve, reject) {
        setTimeout(function() { reject("Promise failed"); }, 800);
    });

    rejectPromise
        .then(function(result) { console.log("Will not run"); })
        .catch(function(error) { console.log("Caught error:", error); });
}

async function demonstrateAsyncAwait() {
    console.log("Demonstrating async/await ...");
    try {
        var promise = new Promise(function(resolve) {
            setTimeout(function() { resolve("Async/await works!"); }, 300);
        });
        var result = await promise;
        console.log("Async result:", result);
    } catch (error) {
        console.log("Async error:", error);
    }
}

function demonstrateExecutionOrder() {
    console.log("Demonstrating execution order ...");
    console.log("# 1");
    setTimeout(function() { console.log("# 4"); }, 0);
    Promise.resolve().then(function() { console.log("# 3"); });
    console.log("# 2");
}

//_______________________________________________________________________________________________________________________

// part b: fetch api 

console.log("\n----- FETCH API -----");

function demonstrateFetch() {
    console.log("Demonstrating basic fetch with .then/.catch...");

    fetch("https://jsonplaceholder.typicode.com/posts/1")
        .then(function(response) {
            console.log("Response object:", response);
            console.log("Response status:", response.status);
            console.log("Response ok:", response.ok);
            return response.json();
        })
        .then(function(data) {
            console.log("JSON data:", data);
            console.log("Post title:", data.title);
        })
        .catch(function(error) {
            console.log("Fetch error:", error);
        });
}

function demonstrateFetchError() {
    console.log("Demonstrating fetch error handling...");

    fetch("https://jsonplaceholder.typicode.com/posts/123465789")
        .then(function(response) {
            console.log("Error response status:", response.status);
            return response.json();
        })
        .then(function(data) {
            console.log("This might not work");
        })
        .catch(function(error) {
            console.log("Caught fetch error:", error);
        });
}

async function demonstrateAsyncFetch() {
    console.log("Demonstrating async/await fetch...");
    try {
        var response = await fetch("https://jsonplaceholder.typicode.com/users/1");
        console.log("Async response:", response);
        var userData = await response.json();
        console.log("User data:", userData);
        console.log("User name:", userData.name);
    } catch (error) {
        console.log("Async fetch error:", error);
    }
}

async function demonstrateMultipleFetch() {
    console.log("Demonstrating multiple fetches...");
    try {
        var postResponse = await fetch("https://jsonplaceholder.typicode.com/posts/1");
        var postData = await postResponse.json();
        console.log("Post:", postData.title);

        var userResponse = await fetch("https://jsonplaceholder.typicode.com/users/1");
        var userData = await userResponse.json();
        console.log("User:", userData.name);

        console.log("All fetches complete!");
    } catch (error) {
        console.log("Multiple fetch error:", error);
    }
}

demonstrateSetTimeout();
demonstrateSyncVsAsync();
demonstratePromises();
demonstrateAsyncAwait();
demonstrateExecutionOrder();
demonstrateFetch();
demonstrateFetchError();
demonstrateAsyncFetch();
demonstrateMultipleFetch();