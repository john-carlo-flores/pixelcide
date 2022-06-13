import PlayerList from './PlayerList';
import DeckList from './DeckList';

import { useEffect, useState } from 'react';
import axios from 'axios';

const baseURL = 'http://localhost:8080/cards';

const Game = () => {
  const [cards, setCards] = useState([]);
  const [discard, setDiscard] = useState([]);
  const [castle, setCastle] = useState([]);
  const [tavern, setTavern] = useState([]);
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState();
  const [currentBoss, setCurrentBoss] = useState();

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setCards(response.data);
    });
  }, []);

  return (
    <div className="Game">
      {/* <PlayerList players={players} currentPlayer={currentPlayer} />*/}
      <DeckList tavern={tavern} discard={discard} castle={castle} />
    </div>
  );
};

export default Game;
