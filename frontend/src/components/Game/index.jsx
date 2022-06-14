import { useEffect, useState } from 'react';
import axios from 'axios';

import Player from '../Game/Player';
import DeckList from './DeckList';
import makeCastle from '../../helpers/makeCastle';
import makeTavern from '../../helpers/makeTavern';
import gameBackground from '../../assets/backgrounds/game.mp4';
import '../../styles/Game/Game.scss';

const Game = () => {
  const [discard, setDiscard] = useState([]);
  const [castle, setCastle] = useState([]);
  const [tavern, setTavern] = useState([]);
  const [currentBoss, setCurrentBoss] = useState();
  const [playerCards, setPlayerCards] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/cards').then((response) => {
      const cards = response.data;

      const castleDeck = makeCastle(cards);
      setCastle(castleDeck);

      const tavernDeck = makeTavern(cards);

      //for initial player hand
      setPlayerCards(tavernDeck.splice(0, 8));
      //set tavern after first card deal
      setTavern(tavernDeck);
    });
  }, []);

  const user = {
    id: 1,
    username: 'gagan420',
    name: 'singh',
    email: 'a@b.com',
    password_digest: 'password',
    avatar_id: 1,
  };

  return (
    <div className="Game">
      <div className="background-gif"></div>
      <DeckList tavern={tavern} discard={discard} castle={castle} setCurrentBoss={setCurrentBoss} />
      <Player hand={playerCards} playerName={user.username} avatar={user.avatar_id} />
    </div>
  );
};

export default Game;
