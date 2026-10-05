import type { GameBoardProps } from "../App";


const GameBoard = ({ onHandleSelectSquare, board }: GameBoardProps) => {
  
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  className="cell"
                  onClick={() => onHandleSelectSquare(rowIndex, colIndex)}
                  disabled={!!playerSymbol}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};

export default GameBoard;
