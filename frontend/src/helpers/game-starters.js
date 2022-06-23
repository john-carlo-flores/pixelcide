import { shuffle, separateCards } from "./game-helpers";

export function makeCastle(cardsArray) {
  // Separate K, Q, J in separate decks
  const jacks = separateCards(cardsArray, "J");
  const queens = separateCards(cardsArray, "Q");
  const kings = separateCards(cardsArray, "K");

  //shuffle each deck and return combined
  return [...shuffle(kings), ...shuffle(queens), ...shuffle(jacks)];
}

export function makeTavern(cardsArray, numPlayers) {
  const JesterList = ["Jester Red", "Jester Black"];

  // Enable Jester cards based on number of players
  if (numPlayers >= 3) JesterList.pop();
  if (numPlayers === 4) JesterList.pop();

  // Filter cards to make final tavern deck
  const finalDeck = cardsArray.filter(
    (card) =>
      card.tag !== "K" &&
      card.tag !== "Q" &&
      card.tag !== "J" &&
      !JesterList.includes(card.card_name)
  );

  // Shuffle and return
  return [...shuffle(finalDeck)];
}

export function makeHand(cardsArray, maxHand) {
  return cardsArray.splice(0, maxHand);
}

export function calcMaxHand(numPlayers) {
  const maxHandSizes = [0, 8, 7, 6, 5];

  return maxHandSizes[numPlayers];
}
