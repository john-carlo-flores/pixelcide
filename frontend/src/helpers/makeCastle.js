import shuffle from './shuffle';
import seperateCards from './card-seperator';

const makeCastle = (cardsArray) => {
  let finalDeck = [];

  const jacks = seperateCards(cardsArray, 'J');
  const queens = seperateCards(cardsArray, 'Q');
  const kings = seperateCards(cardsArray, 'K');

  shuffle(jacks);
  shuffle(queens);
  shuffle(kings);

  finalDeck = [...kings, ...queens, ...jacks];
  return finalDeck;
};

export default makeCastle;
