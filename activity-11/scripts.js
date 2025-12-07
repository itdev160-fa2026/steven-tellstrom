// Steven Tellstrom, ITDEV-160, 12-4-2025
// activity 11 (final): React Tic-Tac-Toe Tutorial

function Square(props) {
  return (
    <button className="square" onClick={props.onSquareClick}>
      {props.value}
    </button>
  );
}

function Board(props) {
  function handleClick(squareNumber) {
    console.log("clicked square", squareNumber);
    
    //check if square already has x or o, or if game is over
    if (props.squares[squareNumber] || calculateWinner(props.squares)) {
      console.log("can't click here");
      return;
    }
    
    //make a copy of the squares array
    var updatedSquares = props.squares.slice();
    
    //X/O in the clicked square
    if (props.xIsNext) { 
      updatedSquares[squareNumber] = "X";
    } else {
      updatedSquares[squareNumber] = "O";
    }
    
    console.log("new squares:", updatedSquares);
    props.onPlay(updatedSquares);
  }

  //figure out who won or whose turn it is
  var gameWinner = calculateWinner(props.squares);
  var gameStatus;
  if (gameWinner) {
    gameStatus = "winner: " + gameWinner + "!!";
  } else {
    if (props.xIsNext) {
      gameStatus = "Next player: X";
    } else {
      gameStatus = "Next player: O";
    }
  }

  return (
    <div>
      <div className="status">{gameStatus}</div>
      <div className="row">
        <Square value={props.squares[0]} onSquareClick={function() { handleClick(0); }} />
        <Square value={props.squares[1]} onSquareClick={function() { handleClick(1); }} />
        <Square value={props.squares[2]} onSquareClick={function() { handleClick(2); }} />
      </div>
      <div className="row">
        <Square value={props.squares[3]} onSquareClick={function() { handleClick(3); }} />
        <Square value={props.squares[4]} onSquareClick={function() { handleClick(4); }} />
        <Square value={props.squares[5]} onSquareClick={function() { handleClick(5); }} />
      </div>
      <div className="row">
        <Square value={props.squares[6]} onSquareClick={function() { handleClick(6); }} />
        <Square value={props.squares[7]} onSquareClick={function() { handleClick(7); }} />
        <Square value={props.squares[8]} onSquareClick={function() { handleClick(8); }} />
      </div>
    </div>
  );
}

//main game component
function Game() {
  //keep track of all the game moves
  var gameHistory = React.useState([Array(9).fill(null)]);
  var setGameHistory = gameHistory[1];
  gameHistory = gameHistory[0];
  
  var moveNumber = React.useState(0);
  var setMoveNumber = moveNumber[1];
  moveNumber = moveNumber[0];
  
  //x or o turn
  var playerXTurn = moveNumber % 2 === 0;
  var boardSquares = gameHistory[moveNumber];
  
  console.log("current move:", moveNumber);
  console.log("x is next:", playerXTurn);
  
  function handlePlay(newSquares) {
    console.log("handling play with:", newSquares);
    
    //new move to history
    var updatedHistory = gameHistory.slice(0, moveNumber + 1);
    updatedHistory.push(newSquares);
    
    setGameHistory(updatedHistory);
    setMoveNumber(updatedHistory.length - 1);
  }

  function jumpToMove(selectedMove) {
    console.log("jumping to move:", selectedMove);
    setMoveNumber(selectedMove);
  }
  
  //start new game
  function restartGame() {
    console.log("starting new game");
    setGameHistory([Array(9).fill(null)]);
    setMoveNumber(0);
  }

  var historyButtons = gameHistory.map(function(squares, moveIndex) {
    var buttonText;
    if (moveIndex > 0) {
      buttonText = "go to move #" + moveIndex;
    } else {
      buttonText = "go to game start";
    }
    return (
      <li key={moveIndex}>
        <button
          className={moveIndex === moveNumber ? "selected" : ""}
          onClick={function() { jumpToMove(moveIndex); }}
        >
          {buttonText}
        </button>
      </li>
    );
  });

  return (
    <div className="container">
      <div className="board">
        <Board 
          xIsNext={playerXTurn} 
          squares={boardSquares} 
          onPlay={handlePlay} 
        />
        <button className="reset-btn" onClick={restartGame}>
          New Game
        </button>
      </div>
      <div className="info">
        <h2>Game History</h2>
        <ol className="button-list">{historyButtons}</ol>
      </div>
    </div>
  );
}

//checks if game is won 
function calculateWinner(gameSquares) {

  var winningCombinations = [
    [0, 1, 2], //top row
    [3, 4, 5], //middle row  
    [6, 7, 8], //bottom row
    [0, 3, 6], //left column
    [1, 4, 7], //middle column
    [2, 5, 8], //right column
    [0, 4, 8], //diagonal
    [2, 4, 6], //other diagonal
  ];
  
  //check winning combo
  for (var comboIndex = 0; comboIndex < winningCombinations.length; comboIndex++) {
    var position1 = winningCombinations[comboIndex][0];
    var position2 = winningCombinations[comboIndex][1];
    var position3 = winningCombinations[comboIndex][2];
    
    if (gameSquares[position1] && gameSquares[position1] === gameSquares[position2] && gameSquares[position1] === gameSquares[position3]) {
      return gameSquares[position1]; //return x or o
    }
  }
  return null; //no winner as of yet 
}

//start app
var reactRoot = ReactDOM.createRoot(document.getElementById("root"));
reactRoot.render(<Game />);
