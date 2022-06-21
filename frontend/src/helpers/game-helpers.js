export function shuffle(deck) {
  let shuffledDeck = [...deck];
  shuffledDeck.sort((a, b) => 0.5 - Math.random());
  return shuffledDeck;
}

export function separateCards(cards, criteria) {
  return cards.filter((card) => card.tag === criteria);
}
