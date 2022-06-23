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
  commitPlayedfield,
  clearPlayfield,
} from "../helpers/player-helpers";

import {
  updateCycle,
  resetCycle,
  playerDead,
  playerDefense,
} from "../helpers/turn-helpers";

import { updateBossCondition } from "../helpers/boss-helpers";

import axios from "axios";
import _ from "lodash";
import { useEffect, useState } from "react";

const useGame = (socket, link, user) => {
  const [decks, setDecks] = useState({ tavern: [], discard: [], castle: [] });
  const [boss, setBoss] = useState({ current: {}, stats: {}, preview: {} });
  const [cycle, setCycle] = useState({ current: [], original: [] });
  const [players, setPlayers] = useState([]);
  const [status, setStatus] = useState("setup");
  const [validate, setValidate] = useState({});
  const [currentPlayer, setCurrentPlayer] = useState({});
  const [maxHand, setMaxHand] = useState(0);
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState([]);

  const updateGame = (key, data, local = true) => {
    let changes = data;

    switch (key) {
      case "decks":
        setDecks((prev) => {
          changes = { ...prev, ...data };
          if (local) {
            socket.emit("Update Game", link, key, changes);
            return changes;
          }

          return data;
        });
        break;
      case "boss":
        setBoss((prev) => {
          changes = { ...prev, ...data };
          if (local) {
            socket.emit("Update Game", link, key, changes);
            return changes;
          }

          return data;
        });
        break;
      case "cycle":
        setCycle((prev) => {
          changes = { ...prev, ...data };
          if (local) {
            socket.emit("Update Game", link, key, changes);
            return changes;
          }

          return data;
        });
        break;
      case "players":
        setPlayers(() => {
          changes = [...data];
          if (local) {
            socket.emit("Update Game", link, key, changes);
            return changes;
          }

          return data;
        });
        break;
      case "status":
        setStatus(() => {
          if (local) socket.emit("Update Game", link, key, data);
          return data;
        });
        break;
      case "validate":
        setValidate((prev) => {
          changes = { ...prev, ...data };
          if (local) {
            socket.emit("Update Game", link, key, changes);
            return changes;
          }

          return data;
        });
        break;
      case "currentPlayer":
        setCurrentPlayer((prev) => {
          changes = { ...prev, ...data };
          if (local) {
            socket.emit("Update Game", link, key, changes);
            return changes;
          }

          return data;
        });
        break;
      case "maxHand":
        setMaxHand(() => {
          if (local) socket.emit("Update Game", link, key, data);
          return data;
        });
        break;
      case "started":
        setStarted(() => {
          if (local) socket.emit("Update Game", link, key, data);
          return data;
        });

        break;
      case "messages":
        setMessages((prev) => {
          changes = [data, ...prev];
          if (local) {
            socket.emit("Update Game", link, key, changes);
            return changes;
          }

          return data;
        });
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    // On player turn start, turn if then have cards to play
    if (status === "player_turn") {
      setTimeout(() => {
        if (currentPlayer.hand.length <= 0) {
          updateGame("status", "game_over_lose");
        } else {
          updateGame("status", "player_attack");
        }
      }, 2000);
    }

    // On boss attack, check if current player has enough cards to defend
    if (status === "boss_turn") {
      setTimeout(() => {
        if (playerDead(currentPlayer, boss.stats.damage)) {
          updateGame("status", "game_over_lose");
        } else {
          updateGame("status", "boss_attack");
        }
      }, 2000);
    }

    // Reset joker on game end
    if (status === "game_over_lose" || status === "game_over_win") {
      const statsCopy = _.cloneDeep(boss.stats);
      statsCopy.powerDisabled = false;
      updateGame("boss", { stats: statsCopy });
    }
  }, [status]);

  useEffect(() => {
    // Update currentPlayer data everytime player data changes
    if (status !== "setup") {
      updateGame("currentPlayer", players[cycle.current[0]]);
    }

    if (status === "player_attack") {
      const bossCopy = _.cloneDeep(boss);

      // Get spade, club and total damage
      const { spadePower, clubPower, totalDamage } =
        getSuitPowersAndTotalDamage(
          players[cycle.current[0]].field,
          bossCopy.stats,
          bossCopy.stats.powerDisabled
        );

      // Calculate boss damage preview
      const newBossDamage =
        spadePower === 0 ? null : boss.stats.damage - spadePower;
      const newBossHealth =
        clubPower + totalDamage === 0
          ? null
          : boss.stats.health - clubPower - totalDamage;

      // Update boss preview (Set to string to skip !render on 0 falsy)
      bossCopy.preview.damage = newBossDamage?.toString();
      bossCopy.preview.health = newBossHealth?.toString();

      // Save status
      updateGame("boss", { ...bossCopy });
    }
  }, [players]);

  useEffect(() => {
    // Validate player discard amount is enough to defend
    if (status === "boss_attack") {
      const { enoughDefense, damageRemaining } = playerDefense(
        currentPlayer,
        boss.stats.damage
      );

      setValidate((prev) => {
        return {
          ...prev,
          discardButton: enoughDefense,
          discardValue: damageRemaining,
        };
      });
    }

    // validate that player played a card to enable button
    if (status === "player_attack") {
      setValidate((prev) => {
        return {
          ...prev,
          attackButton: currentPlayer.field.length > 0,
        };
      });
    }
  }, [status, currentPlayer]);

  const setGame = (game) => {
    // If game is already started, setGame state on refresh
    setDecks(_.cloneDeep(game.decks));
    setBoss(_.cloneDeep(game.boss));
    setCycle(_.cloneDeep(game.cycle));

    // Use a copy so currentPlayer still references players array
    const playersCopy = _.cloneDeep(game.players);

    setPlayers(playersCopy);
    setCurrentPlayer(playersCopy[game.cycle.current[0]]);

    setValidate(_.cloneDeep(game.validate));
    setMaxHand(game.maxHand);
    setStatus(_.cloneDeep(game.status));
    setStarted(game.started);
    setMessages(_.cloneDeep(game.messages));
  };

  const setup = (playerList, startGame) => {
    const game = {};
    game.decks = {};
    game.messages = [];

    // Get max hand size based on number of players
    game.maxHand = calcMaxHand(playerList.length);
    setMaxHand(game.maxHand);

    // Request for list of all cards from api server
    axios
      .get("/cards")
      .then((response) => {
        const cards = response.data;

        setDecks(() => {
          game.decks.castle = makeCastle(cards);
          game.decks.tavern = makeTavern(cards, playerList.length);
          game.decks.discard = [];

          // Assign boss card and stats
          setBoss(() => {
            const lastCastleCard = game.decks.castle.at(-1);

            game.boss = {
              current: lastCastleCard,
              stats: {
                damage: lastCastleCard.damage,
                health: lastCastleCard.health,
                suit: lastCastleCard.suit,
                powerDisabled: false,
              },
              preview: {
                damage: null,
                health: null,
              },
            };

            return _.cloneDeep(game.boss);
          });

          // Assign starting hand for each player
          setPlayers(() => {
            game.players = playerList.map((player) => {
              return {
                ...player,
                hand: makeHand(game.decks.tavern, game.maxHand),
                field: [],
                discard: [],
                played: [],
              };
            });

            //Assign currentPlayer as a reference
            game.currentPlayer = game.players[0];
            setCurrentPlayer(game.currentPlayer);

            return _.cloneDeep(game.players);
          });

          /* Set Cycle (Player turn order)
            - original does not change
              > Only changes if current player kills boss
            - current changes every turn. First element is shifted out
              > To reset current, set to original
        */
          const cycleList = [];
          playerList.forEach((player, index) => cycleList.push(index));

          setCycle(() => {
            game.cycle = {
              original: [...cycleList],
              current: [...cycleList],
            };

            return _.cloneDeep(game.cycle);
          });

          /* Set ValidateButton (Handles enabling of Discard and Attack button) 
              - discard -> true if enough discard amount
              - attack -> true if valid attack
              - discardVal -> remaining amount required to discard
        */
          setValidate(() => {
            game.validate = {
              discardButton: false,
              attackButton: false,
              discardValue: 0,
            };

            return _.cloneDeep(game.validate);
          });

          // Change status to player_turn once setup is complete
          setStatus(() => {
            game.status = "player_turn";

            return game.status;
          });

          // Setup starting decks
          return {
            discard: [],
            tavern: _.cloneDeep(game.decks.tavern),
            castle: _.cloneDeep(game.decks.castle),
          };
        });

        setTimeout(() => {
          setStarted(() => {
            game.started = true;
            return true;
          });

          socket.emit("Start Game", link);
          startGame(game);
        }, 400);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleYield = () => {
    // Get copy of players to modify
    let playersCopy = _.cloneDeep(players);
    const currentPlayer = playersCopy[cycle.current[0]];

    // Move all player cards back to hand and save state
    currentPlayer.hand = [...currentPlayer.hand, ...currentPlayer.field];
    setPlayers(playersCopy);

    // Get copy of boss to modify
    const bossCopy = _.cloneDeep(boss);

    // Reset Boss Preview
    bossCopy.preview.damage = null;
    bossCopy.preview.health = null;

    // Save state
    updateGame("boss", { ...bossCopy });

    // Proceed to boss attack phase
    updateGame("status", "boss_attack");
  };

  const handlePlayerAttack = () => {
    let discardDeck = _.cloneDeep(decks.discard);
    let tavernDeck = _.cloneDeep(decks.tavern);
    let castleDeck = _.cloneDeep(decks.castle);
    const bossCopy = _.cloneDeep(boss);
    const playersCopy = _.cloneDeep(players);
    const cycleCopy = _.cloneDeep(cycle);
    const currentPlayerIndex = cycleCopy.current[0];
    let newStatus = "";

    // STEP 1: Play Cards
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
      bossCopy.stats.powerDisabled
    );

    // STEP 2: Activate Suit Powers
    // Moves cards from discard to tavern deck
    if (heartPower > 0) {
      const { discardUpdate, tavernUpdate } = activateHeartPower(
        heartPower,
        discardDeck,
        tavernDeck
      );

      // Deck does not update in function so have to send it here
      tavernDeck = tavernUpdate;
      discardDeck = discardUpdate;
    }

    // Draws cards to each player from tavern deck
    if (diamondPower > 0) {
      activateDiamondPower(
        diamondPower,
        playersCopy,
        currentPlayerIndex,
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
      activateJesterPower(jesterPower, bossCopy.stats);
      newStatus = "select_player";
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
      tavernDeck
    );

    // Reset boss preview values
    bossCopy.preview.damage = 0;
    bossCopy.preview.health = 0;

    // commit cards on field to played
    commitPlayfield(playersCopy, currentPlayerIndex);

    // STEP 4: Suffer damage from boss
    // boss still alive, switch status to boss attack
    if (!bossCondition.defeated) {
      // If boss does no damage, skip damage step
      if (bossCopy.stats.damage === 0 && !jesterPower) {
        // Set next player in cycle
        const cycleReset = updateCycle(cycleCopy);
        if (cycleReset) {
          resetCycle(cycleCopy);
          clearPlayfield(playersCopy);
          commitPlayedfield(playersCopy, discardDeck);
        }

        newStatus = "player_turn";
      } else if (newStatus !== "select_player") {
        newStatus = "boss_turn";
      }
    }

    // If dead, keep same player but reset cycle
    // Remove all cards in play field
    // Commit played field to discard
    if (bossCondition.defeated) {
      clearPlayfield(playersCopy);
      commitPlayedfield(playersCopy, discardDeck);
      resetCycle(cycle);
      newStatus = "player_turn";
    }

    // if all bosses dead, set game over win status
    if (bossCondition.gameOver) {
      newStatus = "game_over_win";
    }

    // Update all deck, boss and player data
    updateGame("decks", {
      discard: discardDeck,
      tavern: tavernDeck,
      castle: castleDeck,
    });

    updateGame("cycle", { ...cycleCopy });
    updateGame("boss", { ...bossCopy });
    updateGame("players", playersCopy);
    setTimeout(() => {
      updateGame("status", newStatus);
    }, 100);
  };

  const handlePlayerDiscard = () => {
    let discardDeck = _.cloneDeep(decks.discard);
    const playersCopy = _.cloneDeep(players);
    const cycleCopy = _.cloneDeep(cycle);
    const currentPlayerIndex = cycleCopy.current[0];

    // Move discarded cards from playerfield to discard
    discardDeck = [...discardDeck, ...currentPlayer.discard];
    playersCopy[currentPlayerIndex].discard = []; // clear player discard

    // Set next player in cycle
    const cycleReset = updateCycle(cycleCopy);
    if (cycleReset) {
      resetCycle(cycleCopy);
      clearPlayfield(playersCopy);
      commitPlayedfield(playersCopy, discardDeck);
    }

    // Save changes
    updateGame("players", playersCopy);
    updateGame("cycle", { ...cycleCopy });
    updateGame("currentPlayer", { ...playersCopy[cycleCopy.current[0]] });

    // Go to next player
    updateGame("status", "player_turn");

    updateGame("decks", { discard: discardDeck });
  };

  const handleSelect = (id) => {
    // Create copy of cycle to modify
    const cycleCopy = _.cloneDeep(cycle);

    // Remove current player from beginning of cycle
    cycleCopy.current.shift();

    // Find index of selected player
    const selectedIndex = cycleCopy.current.findIndex((index) => index === id);

    // Remove selected player from cycle and move to first index
    cycleCopy.current.splice(selectedIndex, 1);
    cycleCopy.current.unshift(id);

    // Update Current Player
    updateGame("currentPlayer", { ...players[cycleCopy.current[0]] });

    // Save state and go to next player
    updateGame("cycle", cycleCopy);
    updateGame("status", "player_turn");
  };

  const handleGameOver = () => {
    if (user.host) {
      const state = status === "game_over_win" ? "WIN" : "LOSS";
      socket.emit("Game Over", link, state);
    }
  };

  const handleLeaver = () => {
    let playerFound = false;

    // Only close the lobby if user who left is a player
    players.forEach((player) => {
      if (player.id === user.id) {
        playerFound = true;
      }
    });

    socket.emit("Leave Room", link);
    if (playerFound) socket.emit("Game Over", link, user.id);
  };

  const handleCommands = (command, condition = false) => {
    if (currentPlayer.id !== user.id) return;

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
      case "Select":
        handleSelect(condition);
        break;
      default:
        break;
    }
  };

  const moveCardTo = (card, area, playable = true, playCardSound = null) => {
    if (!playable) return;
    if (currentPlayer.id !== user.id) return;

    switch (area) {
      case "Hand":
        // Copy players to modify and track current player
        const playersCopy = _.cloneDeep(players);
        const currentPlayer = playersCopy[cycle.current[0]];

        // Remove from discard if boss attack
        if (status === "boss_attack") {
          currentPlayer.discard = currentPlayer.discard.filter(
            (item) => item.id !== card.id
          );
        }

        // Remove from field if player attack
        if (status === "player_attack") {
          currentPlayer.field = currentPlayer.field.filter(
            (item) => item.id !== card.id
          );
        }

        // Add card to player hand and save
        currentPlayer.hand = [...currentPlayer.hand, card];
        updateGame("players", playersCopy);
        break;
      case "Discard":
        if (status === "boss_attack") {
          // Copy players to modify and track current player
          const playersCopy = _.cloneDeep(players);
          const currentPlayer = playersCopy[cycle.current[0]];

          // Remove card to move from player hand
          currentPlayer.hand = currentPlayer.hand.filter(
            (item) => item.id !== card.id
          );

          // Add card to player discard
          currentPlayer.discard = [...currentPlayer.discard, card];
          playCardSound();

          // Save player state
          updateGame("players", playersCopy);
        }
        break;
      case "Field":
        if (status === "player_attack" && playable) {
          // Copy players to modify and track current player
          const playersCopy = _.cloneDeep(players);
          const currentPlayer = playersCopy[cycle.current[0]];

          // Remove card to move from player hand
          currentPlayer.hand = currentPlayer.hand.filter(
            (item) => item.id !== card.id
          );

          // Add card to player field
          currentPlayer.field = [...currentPlayer.field, card];

          playCardSound();

          // Save player state
          updateGame("players", playersCopy);
        }
        break;
      default:
        break;
    }
  };

  const sendMessage = (message) => {
    updateGame("messages", message);
  };

  return {
    setup,
    setGame,
    updateGame,
    started,
    handleCommands,
    moveCardTo,
    players,
    currentPlayer,
    boss,
    status,
    validate,
    decks,
    cycle,
    messages,
    sendMessage,
  };
};

export default useGame;
