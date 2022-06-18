import { useEffect, useState } from "react";
import axios from "axios";

import "../../styles/Game/Game.scss";
import Player from "../Game/Player";
import DeckList from "./DeckList";
import makeCastle from "../../helpers/game-starters/makeCastle";
import makeTavern from "../../helpers/game-starters/makeTavern";
import Status from "./Status";
import suitActivation from "../../helpers/player-helpers";
import shuffle from "../../helpers/shuffle";
import PlayedCards from "./PlayedCards";
import PlayerAid from "./PlayerAid";

import { AnimateSharedLayout } from "framer-motion";

const Game = (props) => {
  //initializing Game States
  const [discard, setDiscard] = useState([]);
  const [castle, setCastle] = useState([]);
  const [tavern, setTavern] = useState([]);
  const [currentBoss, setCurrentBoss] = useState({});
  const [currentBossStats, setCurrentBossStats] = useState({});
  const [playerCards, setPlayerCards] = useState([]);
  const [playerField, setPlayerField] = useState([]);
  const [status, setStatus] = useState("player_turn");
  const [playedCards, setPlayedCards] = useState([]);
  const [validateDiscard, setValidateDiscard] = useState(false);
  const [validateAttack, setValidateAttack] = useState(false);
  const [jester, setJester] = useState(false);
  //track card discard value
  const [discardVal, setDiscardVal] = useState([]);
  const [fetchComplete, setFetchComplete] = useState(false);

  const { user, game } = props;

  const maxHand = 8;

  // initial game set up
  useEffect(() => {
    axios.get("/cards").then((response) => {
      const cards = response.data;

      const castleDeck = makeCastle(cards);
      setCastle(castleDeck);

      //setting current boss as last card
      const lastCastleCard = castleDeck.at(-1);
      setCurrentBoss({ ...lastCastleCard });
      setCurrentBossStats({ ...lastCastleCard });

      const tavernDeck = makeTavern(cards);

      //for initial player hand
      setPlayerCards(tavernDeck.splice(0, maxHand));

      //set tavern after first card deal
      setTavern(tavernDeck);

      setFetchComplete(true);
    });
  }, []);

  // check in player turn to see if player has cards, game over if player has no cards
  useEffect(() => {
    if (status === "player_turn") {
      setTimeout(() => {
        if (playerCards.length <= 0 && fetchComplete) {
          setStatus("game_over_lose");
        } else {
          setStatus("player_attack");
        }
      }, 2000);
    }
  }, [status, playerCards]);

  //onClickHander for playerAttack
  const handlePlayerAttack = () => {
    //making copies of states that potentially change multiple times
    let discardCards = [...discard];
    let tavernCards = [...tavern];
    let currentPlayerHand = [...playerCards];
    let bossCard = { ...currentBossStats };
    let castleCards = [...castle];
    let commitedPlayerField = [...playerField];
    let playedCardsCopy = [...playedCards];

    //Activate Jester and short circuit loop to attack stage
    if (
      commitedPlayerField.length === 1 &&
      commitedPlayerField[0].tag === "Jester"
    ) {
      bossCard.suit = "none";
      setJester(true);
      setStatus("player_turn");
      setPlayerField([]);
      setPlayedCards((prev) => [...prev, ...commitedPlayerField]);
      setCurrentBossStats({ ...bossCard });
      return;
    }

    //power-activation logic, returns activated suits
    const { spadePower, diamondPower, heartPower, clubPower } = suitActivation(
      playerField,
      bossCard
    );

    //Heart Power Activated
    if (heartPower > 0) {
      shuffle(discardCards);
      let healingCards;

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

    //Diamond Power Activated
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

    //Spade Power Activated
    if (spadePower > 0) {
      bossCard.damage -= spadePower;
      if (bossCard.damage <= 0) {
        bossCard.damage = 0;
      }
    }

    bossCard.health -= clubPower;
    //Set Flag to change boss on defeat
    let bossDefeated = false;

    // check to see if boss defeated and change state accordingly
    if (bossCard.health < 0) {
      discardCards = [
        ...discardCards,
        currentBoss,
        ...commitedPlayerField,
        ...playedCardsCopy,
      ];
      castleCards.pop();
      bossCard = castleCards.at(-1);
      commitedPlayerField = [];
      setPlayedCards(commitedPlayerField);
      castleCards.length === 0 && setStatus("game_over_win");
      bossDefeated = true;
    } else if (bossCard.health === 0) {
      tavernCards = [...tavernCards, currentBoss];
      castleCards.pop();
      bossCard = castleCards.at(-1);
      discardCards = [
        ...discardCards,
        ...commitedPlayerField,
        ...playedCardsCopy,
      ];
      commitedPlayerField = [];
      setPlayedCards(commitedPlayerField);
      castleCards.length === 0 && setStatus("game_over_win");
      bossDefeated = true;
    } else {
      if (bossCard.damage === 0) {
        setStatus("player_turn");
      } else {
        setStatus("boss_attack");
      }
    }

    //Set States After Attack Complete

    if (bossDefeated) {
      setCurrentBoss(bossCard);
      setJester(false);
    }

    setCurrentBossStats(bossCard);
    setCastle(castleCards);
    setTavern(tavernCards);
    setPlayerCards(currentPlayerHand);
    setDiscard(discardCards);
    setPlayedCards((prev) => [...prev, ...commitedPlayerField]);
    setPlayerField([]);
  };

  // check during boss attack if player has enough cards to discard on attack
  useEffect(() => {
    if (status === "boss_attack") {
      let playerHandVal = 0;

      //get playerhand value i.e sum of damage of all cards
      const playerHand = [...playerCards];
      for (const card of playerHand) {
        playerHandVal += card.damage;
      }
      if (playerHandVal < currentBoss.damage) {
        setStatus("game_over_lose");
      }
    }
  }, [status]);

  // discard validation
  useEffect(() => {
    if (status === "boss_attack") {
      let playerFieldVal = 0;
      for (const card of playerField) {
        playerFieldVal += card.damage;
      }

      if (playerFieldVal >= currentBossStats.damage) {
        setValidateDiscard(true);
      }
      if (playerFieldVal < currentBossStats.damage) {
        setValidateDiscard(false);
      }

      setDiscardVal(currentBossStats.damage - playerFieldVal);
    }
  }, [status, playerField]);

  //attack validation (to open attack button)
  useEffect(() => {
    if (status === "player_attack") {
      if (playerField.length > 0) {
        setValidateAttack(true);
      } else {
        setValidateAttack(false);
      }
    }
  }, [status, playerField]);

  const handleBossAttack = () => {
    setDiscard([...discard, ...playerField]);
    setPlayerField([]);
    setStatus("player_turn");
    setValidateDiscard(false);
    setValidateAttack(false);
  };

  return (
    <div className="Game">
      <div className="background-gif"></div>
      <PlayerAid
        playerField={playerField}
        status={status}
        jester={jester}
        setJester={setJester}
        currentBossStats={currentBossStats}
      />
      <DeckList
        tavern={tavern}
        discard={discard}
        castle={castle}
        currentBoss={currentBossStats}
      />
      <AnimateSharedLayout>
        {/* <motion.div> */}
        <Status
          status={status}
          handlePlayerAttack={handlePlayerAttack}
          handleBossAttack={handleBossAttack}
          validateDiscard={validateDiscard}
          validateAttack={validateAttack}
          discardVal={discardVal}
        />
        {/* </motion.div> */}
      </AnimateSharedLayout>
      <PlayedCards playedCards={playedCards} />
      <Player
        playerField={playerField}
        setPlayerField={setPlayerField}
        playerCards={playerCards}
        setPlayerCards={setPlayerCards}
        playerName={user.username}
        avatar={user.avatar_id}
        status={status}
        currentBoss={currentBossStats}
      />
    </div>
  );
};

export default Game;
