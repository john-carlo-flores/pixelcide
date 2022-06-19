export function shuffle(deck) {
  const shuffledDeck = [...deck];
  shuffledDeck.sort((a, b) => 0.5 - Math.random());
  return shuffledDeck;
}

export function seperateCards(cards, criteria) {
  return cards.filter((card) => card.tag === criteria);
}
