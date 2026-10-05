import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

type GameTurn = {
  square: { row: number; col: number };
  player: string;
};

export interface GameBoardProps {
  onHandleSelectSquare(rowIndex: number, colIndex: number): void;
  board: (string | null)[][];
}

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
const initialPlayers = {
  X: "Player 1",
  O: "Player 2",
}; 

const getActivePlayer = (gameTurns: GameTurn[]) => {
  if (gameTurns.length === 0) return "X";
  return gameTurns[0].player === "X" ? "O" : "X";
};

const getWinner = (gameBoard: (string | null)[][]): string | null => {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    const playerA = gameBoard[a.row][a.column];
    const playerB = gameBoard[b.row][b.column];
    const playerC = gameBoard[c.row][c.column];
    if (playerA && playerA === playerB && playerA === playerC) {
      return playerA;
    }
  }
  return null;
};

const getGameBoard = (turns: GameTurn[]) => {
  const gameBoard = initialGameBoard.map((row) => [...row]);

  for (const turn of turns) {
    const { row, col } = turn.square;
    gameBoard[row][col] = turn.player;
  }

  return gameBoard;
};

function App() {
 
  const [gameTurns, setGameTurns] = useState<GameTurn[]>([]);

  const [players, setPlayers] = useState<{ X: string; O: string }>(initialPlayers);

  const handleSelectSquare = (rowIndex: number, colIndex: number) => {
    setGameTurns((prevGameTurns) => {
      let currentPlayer = "X";
      if (prevGameTurns.length > 0 && prevGameTurns[0].player === "X") {
        currentPlayer = "O";
      }
      return [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevGameTurns,
      ];
    });
  };

  const handlePlayerNameChange = (symbol: "X" | "O", name: string) => {
    setPlayers((prevPlayers) => ({
      ...prevPlayers,
      [symbol]: name,
    }));
  };

  const activePlayer = getActivePlayer(gameTurns);

  const gameBoard = getGameBoard(gameTurns);

  const winner: string | null = getWinner(gameBoard);

  const isDraw = gameTurns.length === 9 && !winner;

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={initialPlayers.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onNameChange={handlePlayerNameChange}
          />
          <Player
            initialName={initialPlayers.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onNameChange={handlePlayerNameChange}
          />
        </ol>
        {(isDraw || winner) && (
          <GameOver
            winner={winner ? players[winner as "X" | "O"] : null}
            onRestart={() => setGameTurns([])}
          />
        )}
        <GameBoard
          onHandleSelectSquare={handleSelectSquare}
          board={gameBoard}
        />
      </div>
    </main>
  );
}

export default App;
