import { useState } from 'react'

interface PlayerProps {
    initialName: string;
    symbol: "X" | "O";
    isActive: boolean;
    onNameChange: (symbol: "X" | "O", name: string) => void;
}

const Player = ({initialName, symbol, isActive, onNameChange}: PlayerProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const [playerName, setPlayerName] = useState(initialName)

    const handleEditClick = () => {
        setIsEditing(isEditing=>!isEditing)
        if (isEditing) {
            onNameChange(symbol as "X" | "O", playerName);
        }
    }
   
    let playerNameDisplay= <span className="player-name">{playerName}</span>;
   
    if (isEditing) {
        playerNameDisplay = <input type="text" required value={playerName} onChange={(e) => setPlayerName(e.target.value)} />;
    }
 
    return (
    <li className={isActive ? "active" : undefined}>
        <span className="player">
          {playerNameDisplay}
          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  )
}

export default Player