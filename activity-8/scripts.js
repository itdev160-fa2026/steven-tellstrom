// Steven Tellstrom, ITDEV-160, 10-19-2025
// Activity 8: Quote of the Day Generator

console.log("=== Activity 8: Quote Generator ===");

//_______________________________________________________________________________________________________________________

// part a : quote API integration

var QUOTE_API_URL = 'https://dummyjson.com/quotes/random';
var newQuoteBtn = document.getElementById('newQuoteBtn');
var loadingIndicator = document.getElementById('loadingIndicator');
var quoteDisplay = document.getElementById('quoteDisplay');
var errorDisplay = document.getElementById('errorDisplay');

function showLoading() {
    loadingIndicator.style.display = 'block';
    quoteDisplay.style.display = 'none';
    errorDisplay.style.display = 'none';
    newQuoteBtn.disabled = true;
    newQuoteBtn.textContent = 'Loading...';
}

function hideLoading() {
    loadingIndicator.style.display = 'none';
    newQuoteBtn.disabled = false;
    newQuoteBtn.textContent = 'Get New Quote';
}

function showError(message) {
    errorDisplay.style.display = 'block';
    quoteDisplay.style.display = 'none';
    var errorElement = errorDisplay;
    var errorText = errorElement.querySelector('p');
    if (errorText) {
        errorText.textContent = message;
    }
}

//_______________________________________________________________________________________________________________________

// part b: quote display functions

function createQuoteCard(quoteText, authorName) {
    quoteDisplay.innerHTML = '';
    
    var quoteElement = document.createElement('blockquote');
    quoteElement.className = 'quote-text';
    quoteElement.textContent = '"' + quoteText + '"';
    
    var authorElement = document.createElement('cite');
    authorElement.className = 'quote-author';
    authorElement.textContent = '— ' + authorName;
    
    quoteDisplay.appendChild(quoteElement);
    quoteDisplay.appendChild(authorElement);
}

function showQuoteWithAnimation() {
    quoteDisplay.style.opacity = '0';
    quoteDisplay.style.display = 'block';
    
    setTimeout(function() {
        quoteDisplay.style.opacity = '0.3';
    }, 50);
    
    setTimeout(function() {
        quoteDisplay.style.opacity = '0.6';
    }, 100);
    
    setTimeout(function() {
        quoteDisplay.style.opacity = '1';
    }, 150);
}

function getRandomQuote() {
    showLoading();
    
    fetch(QUOTE_API_URL)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('API request failed with status: ' + response.status);
            }
            return response.json();
        })
        .then(function(responseData) {
            var quoteText = responseData.quote;
            var authorName = responseData.author;
            
            if (!quoteText || !authorName) {
                throw new Error('Invalid quote data');
            }
            
            hideLoading();
            errorDisplay.style.display = 'none';
            
            createQuoteCard(quoteText, authorName);
            showQuoteWithAnimation();
            
            console.log("Quote displayed:", authorName);
        })
        .catch(function(error) {
            hideLoading();
            
            var message = 'Something went wrong. Please try again.';
            if (error.message.indexOf('fetch') !== -1) {
                message = 'Network error. Check internet connection.';
            } else if (error.message.indexOf('status') !== -1) {
                message = 'Quote service unavailable.';
            }
            
            showError(message);
            console.log("Error:", error.message);
        });
}

function init() {
    loadingIndicator.style.display = 'none';
    quoteDisplay.style.display = 'none';
    errorDisplay.style.display = 'none';
    
    newQuoteBtn.addEventListener('click', function() {
        getRandomQuote();
    });
    
    getRandomQuote();
    
    console.log("Quote generator ready!");
}

document.addEventListener('DOMContentLoaded', init);