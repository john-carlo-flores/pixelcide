import { useEffect, useState } from 'react';
import axios from 'axios';

import '../../styles/Game/Game.scss';
import Player from '../Game/Player';
import DeckList from './DeckList';
import makeCastle from '../../helpers/game-starters/makeCastle';
import makeTavern from '../../helpers/game-starters/makeTavern';
import Status from './Status';
import suitActivation from '../../helpers/suit-activation';

const Game = () => {
  const [discard, setDiscard] = useState([]);
  const [castle, setCastle] = useState([]);
  const [tavern, setTavern] = useState([]);
  const [currentBoss, setCurrentBoss] = useState();
  const [playerCards, setPlayerCards] = useState([]);
  const [playerField, setPlayerField] = useState([]);
  const [status, setStatus] = useState('');

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

  const maxHand = 8;

  const clickHandler = () => {
    //power-activation logic
    const activatedPowers = suitActivation(playerField, currentBoss);

    console.log(activatedPowers);

    setDiscard((prev) => [...prev, ...playerField]);
    setPlayerField([]);
  };

  return (
    <div className="Game">
      <div className="background-gif"></div>
      <DeckList tavern={tavern} discard={discard} castle={castle} setCurrentBoss={setCurrentBoss} />
      <Status status={status} clickHandler={clickHandler} />
      <Player
        playerField={playerField}
        setPlayerField={setPlayerField}
        playerCards={playerCards}
        setPlayerCards={setPlayerCards}
        playerName={user.username}
        avatar={user.avatar_id}
      />
    </div>
  );
};

export default Game;
