const seperateCards = (cardsArray, cardTag) => {
  return cardsArray.filter((card) => card.tag === cardTag);
};

export default seperateCards;
