// Game Constants and Variables
const PLAYER_X = 'X';
const PLAYER_O = 'O';
const board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = PLAYER_X;
let gameOver = false;

// Selectors
const cells = document.querySelectorAll('td');
const message = document.querySelector('#message');
const resetButton = document.querySelector('#reset');

// Game Functions
function displayMessage(msg) {
  message.innerHTML = msg;
}

function resetBoard() {
  board.fill('');
  cells.forEach(cell => cell.innerHTML = '');
  displayMessage(`${currentPlayer}'s turn`);
  gameOver = false;
}

function handleCellClick(event) {
  const index = parseInt(event.target.id);
  if (board[index] !== '' || gameOver) {
    return;
  }
  board[index] = currentPlayer;
  event.target.innerHTML = currentPlayer;
  checkForWinner();
}

function checkForWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a] !== '' && board[a] === board[b] && board[b] === board[c]) {
      displayMessage(`${currentPlayer} wins!`);
      gameOver = true;
      return;
    }
  }
  if (!board.includes('')) {
    displayMessage('Tie game!');
    gameOver = true;
    return;
  }
  currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
  displayMessage(`${currentPlayer}'s turn`);
}

// Event Listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetBoard);

// Initialize Game
resetBoard();