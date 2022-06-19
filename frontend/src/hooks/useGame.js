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
} from "../helpers/player-helpers";

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

  useEffect(() => {
    setup();
  }, []);

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
              > To reset currarray
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

  const handlePlayerAttack = () => {
    const discardDeck = _.cloneDeep(decks.discard);
    const tavernDeck = _.cloneDeep(decks.tavern);
    const castleDeck = _.cloneDeep(decks.castle);
    const bossStats = _.cloneDeep(boss.stats);
    const playersCopy = _.cloneDeep(players);
    const currentPlayer = playersCopy[cycle.original[0]];

    // STEP 1: Play Cards / Yield
    // Get Suit Power values for activation and total damage
    const { spadePower, diamondPower, heartPower, clubPower, totalDamage } =
      getSuitPowersAndTotalDamage(
        currentPlayer.field,
        bossStats,
        bossStats.powerEnabled
      );

    //
    // Moves cards from discard to tavern deck
    if (heartPower > 0) {
      activateHeartPower(heartPower, discardDeck, tavernDeck);
    }

    // Draws cards to each player from tavern deck
    if (diamondPower > 0) {
      activateDiamondPower(
        diamondPower,
        playersCopy,
        cycle.current[0],
        cycle.original,
        tavernDeck,
        maxHand
      );
    }

    // Reduces boss attack
    if (spadePower > 0) {
      activateSpadePower(spadePower, bossStats);
    }

    // Doubles attack damage
    if (clubPower > 0) {
      activateClubPower(clubPower, bossStats);
    }

    // STEP 3: Deal damage to boss and check condition
    // Attack Boss
    bossStats.health -= totalDamage;

    checkBossCondition;
  };

  return { setup };
};

export default useGame;
