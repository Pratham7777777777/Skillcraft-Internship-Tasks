import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [vsComputer, setVsComputer] = useState(null); // null means mode not selected
  const [gameStarted, setGameStarted] = useState(false);

  const winner = calculateWinner(board);
  const currentPlayer = isXNext ? 'X' : 'O';
  const status = winner
    ? `Winner: ${winner}`
    : board.every(Boolean)
    ? 'It\'s a Draw!'
    : `Next Player: ${currentPlayer}`;

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameStarted(false);
    setVsComputer(null);
  };

  // Auto computer move
  useEffect(() => {
    if (vsComputer && !isXNext && !winner) {
      const timer = setTimeout(() => {
        makeComputerMove();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [board, isXNext, winner]);

  const makeComputerMove = () => {
    const emptyIndices = board
      .map((val, idx) => (val === null ? idx : null))
      .filter((val) => val !== null);
    if (emptyIndices.length === 0) return;

    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    const newBoard = [...board];
    newBoard[randomIndex] = 'O';
    setBoard(newBoard);
    setIsXNext(true);
  };

  const renderSquare = (index) => (
    <button className="square" onClick={() => handleClick(index)}>
      {board[index]}
    </button>
  );

  const handleModeSelect = (mode) => {
    setVsComputer(mode === 'computer');
    setGameStarted(true);
  };

  return (
    <div className="game">
      <h1>Tic-Tac-Toe</h1>

      {!gameStarted ? (
        <div className="mode-selection">
          <h2>Select Game Mode</h2>
          <button className="mode-btn" onClick={() => handleModeSelect('computer')}>Play vs Computer</button>
          <button className="mode-btn" onClick={() => handleModeSelect('player')}>Play vs Player</button>
        </div>
      ) : (
        <>
          <div className="status">{status}</div>
          <div className="board">
            {[0, 1, 2].map((row) => (
              <div key={row} className="board-row">
                {renderSquare(row * 3)}
                {renderSquare(row * 3 + 1)}
                {renderSquare(row * 3 + 2)}
              </div>
            ))}
          </div>
          <button className="reset" onClick={resetGame}>
            Restart Game
          </button>
        </>
      )}
    </div>
  );
}

// Winning logic
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default App;
