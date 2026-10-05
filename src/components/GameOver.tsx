import React from 'react'

const GameOver = ({winner, onRestart}: {winner: string | null; onRestart: () => void}) => {
  return (
    <div id="game-over">
        <h2>Game Over!</h2>
        <p>{winner ? `Winner: ${winner} won!` : "It's a draw!"}</p>
        <button onClick={onRestart}>Restart!</button>
    </div>
  )
}

export default GameOver