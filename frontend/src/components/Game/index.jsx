import { useEffect, useState } from 'react';
import axios from 'axios';

import '../../styles/Game/Game.scss';
import Player from '../Game/Player';
import DeckList from './DeckList';
import makeCastle from '../../helpers/game-starters/makeCastle';
import makeTavern from '../../helpers/game-starters/makeTavern';
import Status from './Status';
import suitActivation from '../../helpers/suit-activation';
import shuffle from '../../helpers/shuffle';

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

      //setting current boss as last card
      const lastCastleCard = castleDeck.at(-1);
      setCurrentBoss(lastCastleCard);

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
    //club power = damage we deal to enemy
    const { spadePower, diamondPower, heartPower, clubPower } = suitActivation(playerField, currentBoss);

    let discardCards = [...discard];
    let tavernCards = [...tavern];
    let currentPlayerHand = [...playerCards];
    let bossCard = { ...currentBoss };

    //Hearts case
    if (heartPower > 0) {
      shuffle(discardCards);
      let healingCards;

      //not enough cards
      if (discardCards.length > 0 && discardCards.length <= heartPower) {
        healingCards = discardCards;
        discardCards = [];
        tavernCards = [...healingCards, ...tavernCards];
      }

      if (discardCards.length > 0 && discardCards.length > heartPower) {
        healingCards = discardCards.splice(-heartPower, heartPower);
        tavernCards = [...healingCards, ...tavernCards];
      }
    }

    if (diamondPower > 0) {
      let drawableCards = maxHand - currentPlayerHand.length;
      let cardsDrawn;

      if (diamondPower < drawableCards) {
        drawableCards = diamondPower;
      }

      if (tavernCards.length > 0 && drawableCards >= tavernCards.length) {
        cardsDrawn = tavernCards;
        tavernCards = [];
        currentPlayerHand = [...currentPlayerHand, ...cardsDrawn];
      }

      if (tavernCards.length > 0 && drawableCards < tavernCards.length) {
        cardsDrawn = tavernCards.splice(-drawableCards, drawableCards);
        currentPlayerHand = [...currentPlayerHand, ...cardsDrawn];
      }
    }

    if (spadePower > 0) {
      bossCard.damage -= spadePower;

      if (bossCard.damage <= 0) {
        bossCard.damage = 0;
      }
    }
    // after spade damage
    setCurrentBoss(bossCard);

    // after diamond and heart
    setTavern(tavernCards);
    setPlayerCards(currentPlayerHand);
    setDiscard(discardCards);

    //move playerfield cards to discard
    setDiscard((prev) => [...prev, ...playerField]);
    setPlayerField([]);
  };

  return (
    <div className="Game">
      <div className="background-gif"></div>
      <DeckList tavern={tavern} discard={discard} castle={castle} currentBoss={currentBoss} />
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
