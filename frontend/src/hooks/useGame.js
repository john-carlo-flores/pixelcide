import {
  makeCastle,
  makeTavern,
  makeHand,
  calcMaxHand,
} from "../helpers/game-starters";

import {
  getSuitPowersAndTotalDamage,
  activateClubPower,
  activateHeartPower,
  activateDiamondPower,
  activateSpadePower,
  activateJesterPower,
  commitPlayfield,
  clearPlayfield,
} from "../helpers/player-helpers";

import { updateCycle, resetCycle } from "../helpers/turn-helpers";

import { updateBossCondition } from "../helpers/boss-helpers";

import axios from "axios";
import _ from "lodash";
import { useEffect, useState } from "react";

const useGame = () => {
  const [decks, setDecks] = useState([]);
  const [boss, setBoss] = useState([]);
  const [cycle, setCycle] = useState([]);
  const [players, setPlayers] = useState([]);
  const [status, setStatus] = useState("setup");
  const [validateButton, setValidateButton] = useState([]);
  let maxHand = 0;

  const setGame = (game) => {
    setDecks(_.cloneDeep(game.decks));
    setBoss(_.cloneDeep(game.boss));
    setCycle(_.cloneDeep(game.cycle));
    setPlayers(_.cloneDeep(game.players));
    setStatus(_.cloneDeep(game.status));
    setValidateButton(_.cloneDeep(game.validateButton));
  };

  const setup = (playerList) => {
    // Get max hand size based on number of players
    maxHand = calcMaxHand(playerList.length);

    // Request for list of all cards from api server
    axios.get("cards").then((response) => {
      const cards = response.data;

      setDecks(() => {
        const castleDeck = makeCastle(cards);
        const tavernDeck = makeTavern(cards);

        // Assign boss card and stats
        setBoss(() => {
          const lastCastleCard = castleDeck.at(-1);

          const boss = {
            current: lastCastleCard,
            stats: {
              damage: lastCastleCard.damage,
              health: lastCastleCard.health,
              suit: lastCastleCard.suit,
              powerEnabled: true,
            },
          };

          return boss;
        });

        // Assign starting hand for each player
        setPlayers(() => {
          const setupPlayers = playerList.map((player) => {
            return {
              ...player,
              hand: makeHand(tavernDeck, maxHand),
              field: [],
              discard: [],
              played: [],
            };
          });

          //
          return setupPlayers;
        });

        /* Set Cycle (Player turn order)
            - original does not change
              > Only changes if current player kills boss
            - current changes every turn. First element is shifted out
              > To reset current, set to original
        */
        setCycle({
          original: [...Array(playerList.length).keys()],
          current: [...Array(playerList.length).keys()],
        });

        /* Set ValidateButton (Handles enabling of Discard and Attack button) 
              - discard -> true if enough discard amount
              - attack -> true if valid attack
              - discardVal -> remaining amount required to discard
        */
        setValidateButton({
          discard: false,
          attack: false,
          discardVal: 0,
        });

        // Change status to player_turn once setup is complete
        setStatus("player_turn");

        // Setup starting decks
        return {
          discard: [],
          tavern: tavernDeck,
          castle: castleDeck,
        };
      });
    });
  };

  const handleYield = () => {
    setStatus("boss_turn");
  };

  const handlePlayerAttack = () => {
    const discardDeck = _.cloneDeep(decks.discard);
    const tavernDeck = _.cloneDeep(decks.tavern);
    const castleDeck = _.cloneDeep(decks.castle);
    const bossCopy = _.cloneDeep(boss);
    const playersCopy = _.cloneDeep(players);
    const cycleCopy = _.cloneDeep(cycle);
    const currentPlayer = playersCopy[cycle.original[0]];

    // STEP 1: Play Cards / Yield
    // Get Suit Power values for activation and total damage
    const {
      spadePower,
      diamondPower,
      heartPower,
      clubPower,
      jesterPower,
      totalDamage,
    } = getSuitPowersAndTotalDamage(
      currentPlayer.field,
      bossCopy.stats,
      bossCopy.stats.powerEnabled
    );

    // STEP 2: Activate Suit Powers
    // Moves cards from discard to tavern deck
    if (heartPower > 0) {
      activateHeartPower(heartPower, discardDeck, tavernDeck);
    }

    // Draws cards to each player from tavern deck
    if (diamondPower > 0) {
      activateDiamondPower(
        diamondPower,
        playersCopy,
        cycleCopy.current[0],
        cycleCopy.original,
        tavernDeck,
        maxHand
      );
    }

    // Reduces boss attack
    if (spadePower > 0) {
      activateSpadePower(spadePower, bossCopy.stats);
    }

    // Doubles attack damage
    if (clubPower > 0) {
      activateClubPower(clubPower, bossCopy.stats);
    }

    // Nullify Boss Power
    if (jesterPower) {
      activateJesterPower(bossCopy.stats);
    }

    // STEP 3: Deal damage to boss and check condition
    // Attack Boss
    bossCopy.stats.health -= totalDamage;

    // Check if boss defeated and where to move defeated card
    // updates to next boss
    const bossCondition = updateBossCondition(
      bossCopy,
      castleDeck,
      discardDeck,
      tavernDeck,
      setStatus
    );

    // commit cards on field to played
    commitPlayfield(playersCopy, currentPlayer);

    // STEP 4: Suffer damage from boss
    // boss still alive, switch status to boss attack
    if (!bossCondition.defeated) {
      setStatus("boss_turn");
    }

    // If dead, keep same player but reset cycle
    // Remove all cards in play field
    if (bossCondition.defeated) {
      clearPlayfield(playersCopy);
      resetCycle(cycle);
    }

    // if all bosses dead, set game over win status
    if (bossCondition.gameOver) {
      setStatus("game_over_win");
    }

    // Update all deck, boss and player data
    setDecks({
      discard: discardDeck,
      tavern: tavernDeck,
      castle: castleDeck,
    });

    setCycle(cycleCopy);
    setBoss(bossCopy);
    setPlayers(playersCopy);
  };

  const handlePlayerDiscard = () => {
    const discardDeck = _.cloneDeep(decks.discard);
    const playersCopy = _.cloneDeep(players);
    const currentPlayer = playersCopy[cycle.current[0]];
    const cycleCopy = _.cloneDeep(cycle);

    // Move discarded cards from playerfield to discard
    setDecks([...discardDeck.discard, ...currentPlayer.discard]);
    currentPlayer.discard = []; // clear player discard

    // Go to next player in cycle
    const cycleReset = updateCycle(cycleCopy);
    if (cycleReset) resetCycle(cycleCopy);

    // Save player changes
    setPlayers(playersCopy);
  };

  const handleGameOver = (condition) => {
    // condition = true or false
    // Leave game
    // Axios request to update game table with new state
  };

  const handleLeaver = () => {
    // set user_games status to leaver for specific user
  };

  const handleCommands = (command, condition = false) => {
    switch (command) {
      case "Yield":
        handleYield();
        break;
      case "Attack":
        handlePlayerAttack();
        break;
      case "Discard":
        handlePlayerDiscard();
        break;
      case "Game Over":
        handleGameOver(condition);
        break;
      case "Leave Lobby":
        handleLeaver();
        break;
      default:
        break;
    }
  };

  return { setup, setGame, handleCommands, status, boss };
};

export default useGame;
