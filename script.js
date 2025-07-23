const cells = document.querySelectorAll('.cell');
const statusDiv = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const startBtn = document.getElementById('startBtn');
const backBtn = document.getElementById('backBtn');
const menuDiv = document.getElementById('menu');
const gameContainer = document.getElementById('gameContainer');
const difficultySelect = document.getElementById('difficulty');

let currentPlayer = 'X';
let board = Array(9).fill(null);
let gameOver = false;
let gameMode = 'player';
let difficulty = 'easy';

startBtn.addEventListener('click', () => {
  gameMode = document.querySelector('input[name="mode"]:checked').value;
  difficulty = difficultySelect.value;
  board = Array(9).fill(null);
  currentPlayer = 'X';
  gameOver = false;
  renderBoard();
  updateStatus("Ход игрока X");
  menuDiv.style.display = 'none';
  gameContainer.style.display = 'block';
});

resetBtn.addEventListener('click', () => {
  board = Array(9).fill(null);
  currentPlayer = 'X';
  gameOver = false;
  renderBoard();
  updateStatus("Ход игрока X");
});

backBtn.addEventListener('click', () => {
  gameContainer.style.display = 'none';
  menuDiv.style.display = 'block';
  board = Array(9).fill(null);
  renderBoard();
  updateStatus('');
});

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const index = cell.dataset.index;
    if (gameOver || board[index]) return;

    if (gameMode === 'player' || currentPlayer === 'X') {
      makeMove(index, currentPlayer);
      if (gameMode === 'bot' && !gameOver) {
        setTimeout(() => {
          botMove();
        }, 400);
      }
    }
  });
});

function makeMove(index, player) {
  if (!board[index] && !gameOver) {
    board[index] = player;
    renderBoard();
    if (checkWin(player)) {
      updateStatus(`Победа: ${player}`);
      gameOver = true;
    } else if (board.every(cell => cell)) {
      updateStatus("Ничья!");
      gameOver = true;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      updateStatus(`Ход игрока ${currentPlayer}`);
    }
  }
}

function renderBoard() {
  cells.forEach((cell, i) => {
    cell.textContent = board[i] || '';
  });
}

function updateStatus(msg) {
  statusDiv.textContent = msg;
}

function checkWin(player) {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return wins.some(combo => combo.every(i => board[i] === player));
}

function botMove() {
  let move;
  if (difficulty === 'easy') {
    move = getRandomMove();
  } else if (difficulty === 'normal') {
    move = Math.random() < 0.5 ? getBestMove() : getRandomMove();
  } else if (difficulty === 'hard') {
    move = Math.random() < 0.8 ? getBestMove() : getRandomMove();
  } else {
    move = getBestMove(); // impossible
  }
  if (move !== null) {
    makeMove(move, 'O');
  }
}

function getRandomMove() {
  const empty = board.map((val, i) => val ? null : i).filter(v => v !== null);
  return empty.length ? empty[Math.floor(Math.random() * empty.length)] : null;
}

function getBestMove() {
  let bestScore = -Infinity;
  let move = null;
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = 'O';
      let score = minimax(board, 0, false);
      board[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
}

function minimax(boardState, depth, isMaximizing) {
  if (checkWin('O')) return 10 - depth;
  if (checkWin('X')) return depth - 10;
  if (boardState.every(cell => cell)) return 0;

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (!boardState[i]) {
        boardState[i] = 'O';
        best = Math.max(best, minimax(boardState, depth + 1, false));
        boardState[i] = null;
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 9; i++) {
      if (!boardState[i]) {
        boardState[i] = 'X';
        best = Math.min(best, minimax(boardState, depth + 1, true));
        boardState[i] = null;
      }
    }
    return best;
  }
}