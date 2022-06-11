import { useState } from 'react';
import PlayerList from '../components/PlayerList';
import DeckList from '../components/DeckList';

const Game = () => {
  const [discard, setDiscard] = useState([]);
  const [castle, setCastle] = useState([]);
  const [tavern, setTavern] = useState([]);
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState();
  const [currentBoss, setCurrentBoss] = useState();

  return (
    <div className="Game">
      <PlayerList players={players} currentPlayer={currentPlayer} />
      <DeckList tavern={tavern} discard={discard} castle={castle} />
    </div>
  );
};

export default Game;
