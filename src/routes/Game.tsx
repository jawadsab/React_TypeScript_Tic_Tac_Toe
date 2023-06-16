import React, { useState, useRef } from 'react';
import Cell from '../components/Cell';
import Screen from '../components/Screen';

function Game() {
  const [cells, setCells] = useState<Array<string>>(Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  const [currentPlayer, setCurrentPlayer] = useState(isX === true ? 'X' : 'O');
  const [isGameOver, setIsGameOver] = useState({ byWin: false, byDraw: false });
  const cellsRef = useRef(null);
  function handleCellClick(index: number) {
    if (cells[index] !== null || findWinner(cells) !== null) {
      return;
    }
    const updatedCells = cells.map((cell, idx) => {
      if (idx === index) {
        cell = isX ? 'X' : 'O';
      }
      return cell;
    });
    setCells(updatedCells);
    setIsX(!isX);
    if (findWinner(updatedCells) !== null) {
      setIsGameOver({ ...isGameOver, byWin: true });
      highlight();
      return;
    }
    const isDraw = updatedCells.every((cell) => cell !== null);
    if (isDraw) {
      setIsGameOver({ ...isGameOver, byDraw: true });
      return;
    }
    setCurrentPlayer(isX === true ? 'O' : 'X');
  }
  let pos1 = null;
  let pos2 = null;
  let pos3 = null;

  function highlight() {
    let cell1 = cellsRef.current.get(pos1);
    let cell2 = cellsRef.current.get(pos2);
    let cell3 = cellsRef.current.get(pos3);
    let bgColor = currentPlayer == 'X' ? '#ff6392' : '#fec601';
    setTimeout(() => {
      cell1.style.backgroundColor = bgColor;
    }, 2);
    setTimeout(() => {
      cell2.style.backgroundColor = bgColor;
    }, 150);
    setTimeout(() => {
      cell3.style.backgroundColor = bgColor;
    }, 300);
  }

  function findWinner(cells: Array<string>) {
    const winningPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winningPatterns.length; i++) {
      const [a, b, c] = winningPatterns[i];
      if (cells[a] !== null && cells[a] == cells[b] && cells[a] == cells[c]) {
        pos1 = a;
        pos2 = b;
        pos3 = c;
        return cells[a];
      }
    }
    return null;
  }

  function handleGameStart() {
    setCells(Array(9).fill(null));
    setIsX(true);
    setCurrentPlayer('X');
    setIsGameOver({ byWin: false, byDraw: false });
    for (let i = 0; i < 9; i++) {
      cellsRef.current.get(i).style.backgroundColor = '#012a4a';
    }
  }

  function setStatus() {
    let status: React.JSXElement;
    if (isGameOver.byWin === true) {
      status = (
        <h2 className="player-move">
          Player <span className="red-letter">{currentPlayer}</span> Wins!
        </h2>
      );
    } else if (isGameOver.byDraw === true) {
      status = <h2 className="player-move">It's a Draw</h2>;
    } else {
      status = (
        <h2 className="player-move">
          Player <span className="red-letter">{currentPlayer}'s</span> move
        </h2>
      );
    }

    return status;
  }

  function getMap() {
    if (!cellsRef.current) {
      cellsRef.current = new Map();
    }
    return cellsRef.current;
  }

  return (
    <Screen screenClassName="game-container">
      {setStatus()}
      <div className="board-container">
        <div className="board">
          {cells.map((cell, idx) => {
            return (
              <div
                key={idx}
                ref={(node) => {
                  const map = getMap();
                  if (node) {
                    map.set(idx, node);
                  } else {
                    map.delete(idx);
                  }
                }}
                onClick={() => handleCellClick(idx)}
                className="cell"
              >
                <Cell cellValue={cell} position={idx} />
              </div>
            );
          })}
        </div>
      </div>
      {(isGameOver.byWin == true || isGameOver.byDraw == true) && (
        <div className="section btns">
          <button onClick={handleGameStart} className="single-player-btn btn">
            Restart
          </button>
        </div>
      )}
    </Screen>
  );
}

export default Game;
