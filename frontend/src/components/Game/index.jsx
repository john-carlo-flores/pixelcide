import { useEffect, useState } from 'react';
import axios from 'axios';

import PlayerList from './PlayerList';
import DeckList from './DeckList';
import makeCastle from '../../helpers/makeCastle';
import makeTavern from '../../helpers/makeTavern';

const baseURL = 'http://localhost:8080/cards';

const Game = () => {
  const [discard, setDiscard] = useState([]);
  const [castle, setCastle] = useState([]);
  const [tavern, setTavern] = useState([]);
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState();
  const [currentBoss, setCurrentBoss] = useState();

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      const cards = response.data;

      const castleDeck = makeCastle(cards);
      setCastle(castleDeck);

      const tavernDeck = makeTavern(cards);
      setTavern(tavernDeck);
    });
  }, []);

  return (
    <div className="Game">
      {/* <PlayerList players={players} currentPlayer={currentPlayer} /> */}
      <DeckList tavern={tavern} discard={discard} castle={castle} setCurrentBoss={setCurrentBoss} />
    </div>
  );
};

export default Game;
