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
import PlayedCards from './PlayedCards';

const Game = () => {
  const [discard, setDiscard] = useState([]);
  const [castle, setCastle] = useState([]);
  const [tavern, setTavern] = useState([]);
  const [currentBoss, setCurrentBoss] = useState();
  const [playerCards, setPlayerCards] = useState([]);
  const [playerField, setPlayerField] = useState([]);
  const [status, setStatus] = useState('game_over_lose');
  const [playedCards, setPlayedCards] = useState([]);

  const maxHand = 8;

  useEffect(() => {
    axios.get('/cards').then((response) => {
      const cards = response.data;

      const castleDeck = makeCastle(cards);
      setCastle(castleDeck);

      //setting current boss as last card
      const lastCastleCard = castleDeck.at(-1);
      setCurrentBoss(lastCastleCard);

      const tavernDeck = makeTavern(cards);

      //for initial player hand
      setPlayerCards(tavernDeck.splice(0, maxHand));

      //set tavern after first card deal
      setTavern(tavernDeck);
    });
  }, []);

  useEffect(() => {
    if (status === 'player_turn') {
      setTimeout(() => {
        if (playerCards.length <= 0) {
          setStatus('game_over_lose');
        } else {
          setStatus('player_attack');
        }
      }, 2000);
    }
  }, [status, playerCards]);

  const user = {
    id: 1,
    username: 'gagan420',
    name: 'singh',
    email: 'a@b.com',
    password_digest: 'password',
    avatar_id: 1,
  };

  const handlePlayerAttack = () => {
    //power-activation logic
    const { spadePower, diamondPower, heartPower, clubPower } = suitActivation(playerField, currentBoss);
    let discardCards = [...discard];
    let tavernCards = [...tavern];
    let currentPlayerHand = [...playerCards];
    let bossCard = { ...currentBoss };
    let castleCards = [...castle];
    let commitedPlayerField = [...playerField];
    let playedCardsCopy = [...playedCards];

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

    bossCard.health -= clubPower;
    if (bossCard.health < 0) {
      discardCards = [...discardCards, bossCard, ...commitedPlayerField, ...playedCardsCopy];
      castleCards.pop();
      bossCard = castleCards.at(-1);
      commitedPlayerField = [];
      setPlayedCards(commitedPlayerField);
      castleCards.length === 0 && setStatus('game_over_win');
    } else if (bossCard.health === 0) {
      tavernCards = [...tavernCards, bossCard];
      castleCards.pop();
      bossCard = castleCards.at(-1);
      discardCards = [...discardCards, ...commitedPlayerField, ...playedCardsCopy];
      commitedPlayerField = [];
      setPlayedCards(commitedPlayerField);
      castleCards.length === 0 && setStatus('game_over_win');
    } else {
      setStatus('boss_attack');
    }

    // after spade damage
    setCurrentBoss(bossCard);
    setCastle(castleCards);
    // after diamond and heart
    setTavern(tavernCards);
    setPlayerCards(currentPlayerHand);
    setDiscard(discardCards);

    //move playerfield cards to discard
    setPlayedCards((prev) => [...prev, ...commitedPlayerField]);
    setPlayerField([]);
  };

  const handleBossAttack = () => {
    setStatus('player_turn');
  };

  return (
    <div className="Game">
      <div className="background-gif"></div>
      <DeckList tavern={tavern} discard={discard} castle={castle} currentBoss={currentBoss} />
      <Status status={status} handlePlayerAttack={handlePlayerAttack} handleBossAttack={handleBossAttack} />
      <PlayedCards playedCards={playedCards} />
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
