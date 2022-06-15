import shuffle from '../shuffle';

const makeTavern = (cardsArray) => {
  const finalDeck = cardsArray.filter((card) => card.tag !== 'K' && card.tag !== 'Q' && card.tag !== 'J');
  shuffle(finalDeck);
  return finalDeck;
};

export default makeTavern;
