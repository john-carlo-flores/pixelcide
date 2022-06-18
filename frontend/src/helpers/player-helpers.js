import { shuffle } from "./game-helpers";

export function getSuitPowersAndTotalDamage(
  playerField,
  currentBoss,
  jesterActive = false
) {
  let totalValue = 0;
  let spadePower = 0; // spades - reduces boss attack
  let diamondPower = 0; // diamonds - draw cards from tavern
  let heartPower = 0; // hearts - replenish our tavern from discard
  let clubPower = 0; // clubs - double damage

  const suits = [];

  // Sum up total damage and track all unique suits activated
  for (const card of playerField) {
    totalValue += card.damage;

    if (
      !suits.includes(card.suit) &&
      (jesterActive || card.suit !== currentBoss.suit)
    ) {
      suits.push(card.suit);
    }
  }

  if (suits.includes("Spades")) {
    //activate spades
    spadePower = totalValue;
  }

  if (suits.includes("Diamonds")) {
    //activate diamonds
    diamondPower = totalValue;
  }

  if (suits.includes("Hearts")) {
    //activate hearts
    heartPower = totalValue;
  }

  if (suits.includes("Clubs")) {
    //activate clubs
    clubPower = totalValue;
  }

  return {
    spadePower,
    diamondPower,
    heartPower,
    clubPower,
    totalDamage: totalValue,
  };
}

export function activateHeartPower(power, discardDeck, tavernDeck) {
  let cardsHealed;

  // If discard deck is less than or equal to number of cards to heal
  // Move all cards to bottom of tavern deck
  if (discardDeck.length > 0 && discardDeck.length <= power) {
    cardsHealed = discardDeck;
    discardDeck = [];
    tavernDeck = [...cardsHealed, ...tavernDeck];
  }

  // If discard deck is greater than number of cards to heal
  // Move amount to bottom of tavern deck
  if (discardDeck.length > 0 && discardDeck.length > power) {
    cardsHealed = discardDeck.splice(-power, power);
    tavernDeck = [...cardsHealed, ...tavernDeck];
  }
}

export function activateDiamondPower(
  power,
  players,
  activePlayer,
  cycle,
  tavernDeck,
  maxHand
) {
  // Make a copy of player list to update player hands
  // Remove players from copy which are full
  const playersList = [...players];

  // Make a copy of draw amount to reduce per loop
  let cardsLeftToDraw = power;

  // Set start of draw cycle to player who activated power
  let currentPlayer = nextPlayer(cycle, activePlayer);

  // Shuffle deck before proceeding
  tavernDeck = shuffle(tavernDeck);

  /* Draw Cards until:
      - All players hands are full
      - All cards based on diamond power are drawn
      - Tavern Deck is empty
  */
  while (
    playersList.length !== 0 &&
    cardsLeftToDraw > 0 &&
    tavernDeck.length > 0
  ) {
    // If currentPlayer's hand is maxed out, remove from list of players to give out cards
    if (playersList[currentPlayer].hand.length === maxHand) {
      playersList.splice(currentPlayer, 1);
    }

    // Draw a card from tavern deck and give to player hand
    currentPlayer.hand.push(tavernDeck.pop());

    // Reduce total amount of cards left to draw
    cardsLeftToDraw--;

    // Go to next player
    currentPlayer = nextPlayer(cycle, currentPlayer);
  }
}

function nextPlayer(cycle, currentPlayer, start = false) {
  const currentIndex = cycle.findIndex((index) => index === currentPlayer);
  if (start) return currentIndex;
  return currentIndex + 1 > cycle.length ? 0 : currentIndex + 1;
}

export function activateSpadePower(power, bossStats) {
  bossStats.damage -= power;
  if (bossStats.damage < 0) bossStats.damage = 0;
}

export function activateClubPower(power, bossStats) {
  bossStats.health -= power;
}
