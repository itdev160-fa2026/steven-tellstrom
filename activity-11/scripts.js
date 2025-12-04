//Steven Tellstrom, ITDEV-160, activity 10

console.log("Activity 10: Tic-Tac-Toe with localStorage");

//_______________________________________________________________________________________________________________________


//part a: localStorage demos


function checkLocalStorageSupport() {

    try {
        var testKey = "test-storage";
        localStorage.setItem(testKey, "testing");
        localStorage.removeItem(testKey);
        console.log("localStorage works");
        return true;
    } catch (error) {
        console.log("localStorage is NOT working:", error);
        return false;
    }
}

function showLocalStorage() {
    console.log("----- localStorage demos -----");
    
    if (!checkLocalStorageSupport()) {
        return;
    }
    
    localStorage.setItem('name', 'Steven');
    console.log("name:", localStorage.getItem('name'));
    
    let player = { name: 'Steven', score: 100 };
    localStorage.setItem('player', JSON.stringify(player));
    console.log("player:", JSON.parse(localStorage.getItem('player')));
    
    let games = ['win', 'lose', 'draw'];
    localStorage.setItem('games', JSON.stringify(games));
    console.log("games:", JSON.parse(localStorage.getItem('games')));
    
    localStorage.removeItem('name');
    console.log("after remove:", localStorage.getItem('name'));
    
    localStorage.clear();
    console.log("localStorage cleared");
}


//_______________________________________________________________________________________________________________________


//part b: game state - using separate variables instead of obj


var gameBoard = ['', '', '', '', '', '', '', '', ''];

var currentPlayer = 'X';

var gameStatus = 'playing';

var gameWinner = null;

// storage keys
var gameStateKey = 'ticTacToeGame';
var statsKey = 'gameStats';

var isLocalStorageSupported = typeof(Storage) !== "undefined";

function newGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameStatus = 'playing';
    gameWinner = null;
    updateBoard();
    saveGameState();
}

function makeMove(spot) {
    console.log("making a move at position:", spot);
    
    if (gameBoard[spot] !== '' || gameStatus !== 'playing') {
        console.log("Invalid move");
        return;
    }
    
    gameBoard[spot] = currentPlayer;
    console.log("Board after move:", gameBoard);
    
    if (checkWin()) {
        gameStatus = 'won';
        gameWinner = currentPlayer;
        updateStats(currentPlayer);
    } else if (checkDraw()) {
        gameStatus = 'draw';
        updateStats('draw');
    } else {
        //switch player
        if (currentPlayer === 'X') {
            currentPlayer = 'O';
        } else {
            currentPlayer = 'X';
        }
    }
    
    updateBoard();
    saveGameState();
}

//checking each condition separately
function checkWin() {
    if (gameBoard[0] !== '' && gameBoard[0] === gameBoard[1] && gameBoard[1] === gameBoard[2]) {
        return true; //top
    }
    if (gameBoard[3] !== '' && gameBoard[3] === gameBoard[4] && gameBoard[4] === gameBoard[5]) {
        return true; //middle
    }
    if (gameBoard[6] !== '' && gameBoard[6] === gameBoard[7] && gameBoard[7] === gameBoard[8]) {
        return true; //bottom
    }
    

    if (gameBoard[0] !== '' && gameBoard[0] === gameBoard[3] && gameBoard[3] === gameBoard[6]) {
        return true; //left
    }
    if (gameBoard[1] !== '' && gameBoard[1] === gameBoard[4] && gameBoard[4] === gameBoard[7]) {
        return true; //middle
    }
    if (gameBoard[2] !== '' && gameBoard[2] === gameBoard[5] && gameBoard[5] === gameBoard[8]) {
        return true; //right
    }
    
    // check diagonals
    if (gameBoard[0] !== '' && gameBoard[0] === gameBoard[4] && gameBoard[4] === gameBoard[8]) {
        return true; //diagonal top left to bottom right
    }
    if (gameBoard[2] !== '' && gameBoard[2] === gameBoard[4] && gameBoard[4] === gameBoard[6]) {
        return true; //diagonal top right to bottom left
    }
    
    return false;
}

function checkDraw() {
    if (gameBoard[0] === '') return false;
    if (gameBoard[1] === '') return false;
    if (gameBoard[2] === '') return false;
    if (gameBoard[3] === '') return false;
    if (gameBoard[4] === '') return false;
    if (gameBoard[5] === '') return false;
    if (gameBoard[6] === '') return false;
    if (gameBoard[7] === '') return false;
    if (gameBoard[8] === '') return false;
    
    return true;
}

//_______________________________________________________________________________________________________________________


// Part C: localStorage Integration


console.log("\n----- localStorage Integration -----");

// save game state
function saveGameState() {
    if (!isLocalStorageSupported) return;

    try {
        var gameStateData = {
            board: gameBoard,
            player: currentPlayer,
            status: gameStatus,
            winner: gameWinner
        };
        localStorage.setItem(gameStateKey, JSON.stringify(gameStateData));
        console.log("game state saved");
    } catch (error) {
        console.error("could not save game state:", error);
    }
}

//load game state
function loadGameState() {
    if (!isLocalStorageSupported) return false;

    try {
        var saved = localStorage.getItem(gameStateKey);
        if (saved) {
            var gameStateData = JSON.parse(saved);
            gameBoard = gameStateData.board;
            currentPlayer = gameStateData.player;
            gameStatus = gameStateData.status;
            gameWinner = gameStateData.winner;
            console.log("game state loaded from localStorage:", gameStateData);
            return true;
        }
    } catch (error) {
        console.error("failed to load game state:", error);
    }

    return false;
}

//save stats
function saveStatistics() {
    if (!isLocalStorageSupported) return;

    try {
        var statisticsData = { 
            xWins: xWins, 
            oWins: oWins, 
            draws: draws, 
            totalGames: totalGames 
        };
        localStorage.setItem(statsKey, JSON.stringify(statisticsData));
        console.log("statistics saved to localStorage");
    } catch (error) {
        console.error("failed to save statistics:", error);
    }
}

//load stats
function loadStatistics() {
    if (!isLocalStorageSupported) return;

    try {
        var saved = localStorage.getItem(statsKey);
        if (saved) {
            var statisticsData = JSON.parse(saved);
            xWins = statisticsData.xWins;
            oWins = statisticsData.oWins;
            draws = statisticsData.draws;
            totalGames = statisticsData.totalGames;
            console.log("Stats loaded from localStorage:", statisticsData);
        }
    } catch (error) {
        console.error("Failed to load stats:", error);
    }
}

// reset stats
function resetStatistics() {
    console.log("resetting stats");

    xWins = 0;
    oWins = 0;
    draws = 0;
    totalGames = 0;

    saveStatistics();
    showStats();

    console.log("stats reset");
}

function clearAllData() {
    localStorage.removeItem(gameStateKey);
    localStorage.removeItem(statsKey);
    console.log("all data cleared from localStorage");
}

//_______________________________________________________________________________________________________________________


//part e: statistics


var xWins = 0;
var oWins = 0;
var draws = 0;
var totalGames = 0;

function updateStats(winner) {
    totalGames = totalGames + 1;
    
    if (winner === 'X') {
        xWins = xWins + 1;
    } else if (winner === 'O') {
        oWins = oWins + 1;
    } else {
        draws = draws + 1;
    }
    
    saveStatistics();
    showStats();
    
    console.log("Total games played:", totalGames);
}

function showStats() {
    document.getElementById('xWins').textContent = xWins;
    document.getElementById('oWins').textContent = oWins;
    document.getElementById('draws').textContent = draws;
}

//_______________________________________________________________________________________________________________________


//display functions


function updateBoard() {
    var cell0 = document.querySelector('[data-index="0"]');
    var cell1 = document.querySelector('[data-index="1"]');
    var cell2 = document.querySelector('[data-index="2"]');
    var cell3 = document.querySelector('[data-index="3"]');
    var cell4 = document.querySelector('[data-index="4"]');
    var cell5 = document.querySelector('[data-index="5"]');
    var cell6 = document.querySelector('[data-index="6"]');
    var cell7 = document.querySelector('[data-index="7"]');
    var cell8 = document.querySelector('[data-index="8"]');
    
    updateSingleCell(cell0, 0);
    updateSingleCell(cell1, 1);
    updateSingleCell(cell2, 2);
    updateSingleCell(cell3, 3);
    updateSingleCell(cell4, 4);
    updateSingleCell(cell5, 5);
    updateSingleCell(cell6, 6);
    updateSingleCell(cell7, 7);
    updateSingleCell(cell8, 8);
    
    var statusElement = document.getElementById('gameStatus');
    if (gameStatus === 'won') {
        statusElement.textContent = 'Player ' + gameWinner + ' wins!';
    } else if (gameStatus === 'draw') {
        statusElement.textContent = 'Draw!';
    } else {
        statusElement.textContent = 'Player ' + currentPlayer + ' turn';
    }
    
    var currentElement = document.getElementById('currentPlayer');
    if (gameStatus === 'playing') {
        currentElement.textContent = 'Current Player: ' + currentPlayer;
    }
}

function updateSingleCell(cellElement, index) {

    cellElement.textContent = gameBoard[index];
    
    if (gameBoard[index] === 'X') {
        cellElement.className = 'cell x';
    } else if (gameBoard[index] === 'O') {
        cellElement.className = 'cell o';
    } else {
        cellElement.className = 'cell';
    }
    
    if (gameBoard[index] !== '' || gameStatus !== 'playing') {
        cellElement.disabled = true;
    } else {
        cellElement.disabled = false;
    }
}

//_______________________________________________________________________________________________________________________


//setup when page loads


function setupCellClickHandlers() {
    var cell0 = document.querySelector('[data-index="0"]');
    var cell1 = document.querySelector('[data-index="1"]');
    var cell2 = document.querySelector('[data-index="2"]');
    var cell3 = document.querySelector('[data-index="3"]');
    var cell4 = document.querySelector('[data-index="4"]');
    var cell5 = document.querySelector('[data-index="5"]');
    var cell6 = document.querySelector('[data-index="6"]');
    var cell7 = document.querySelector('[data-index="7"]');
    var cell8 = document.querySelector('[data-index="8"]');
    
    cell0.addEventListener('click', function() { makeMove(0); });
    cell1.addEventListener('click', function() { makeMove(1); });
    cell2.addEventListener('click', function() { makeMove(2); });
    cell3.addEventListener('click', function() { makeMove(3); });
    cell4.addEventListener('click', function() { makeMove(4); });
    cell5.addEventListener('click', function() { makeMove(5); });
    cell6.addEventListener('click', function() { makeMove(6); });
    cell7.addEventListener('click', function() { makeMove(7); });
    cell8.addEventListener('click', function() { makeMove(8); });
}

function setupButtonClickHandlers() {
    var newGameButton = document.getElementById('newGameBtn');
    var resetStatsButton = document.getElementById('resetStatsBtn');
    
    newGameButton.addEventListener('click', function() {
        newGame();
    });
    
    resetStatsButton.addEventListener('click', function() {
        resetStatistics();
    });
}

document.addEventListener('DOMContentLoaded', function() 
{
    showLocalStorage();
    
    if (!loadGameState()) 
    {
        newGame();
    }
    
    loadStatistics();
    showStats();
    updateBoard();
    
    setupCellClickHandlers();
    setupButtonClickHandlers();

});