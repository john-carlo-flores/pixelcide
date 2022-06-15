const suitActivation = (playerField, currentBoss) => {
  let clubChecker = false;
  let totalDamage = 0;
  let spadePower = 0; // spades reduces boss attack
  let diamondPower = 0; // diamonds we draw cards from tavern
  let heartPower = 0; // hearts we replenish our tavern from discard
  let clubPower = 0; // clubs we double damage

  for (const card of playerField) {
    totalDamage += card.damage;
  }

  for (const card of playerField) {
    if (card.suit === 'Spades' && card.suit !== currentBoss.suit) {
      //active spades
      spadePower = totalDamage;
    }
    if (card.suit === 'Diamonds' && card.suit !== currentBoss.suit) {
      //activate diamonds
      diamondPower = totalDamage;
    }
    if (card.suit === 'Hearts' && card.suit !== currentBoss.suit) {
      //activate hearts
      heartPower = totalDamage;
    }

    if (card.suit === 'Clubs' && card.suit !== currentBoss.suit) {
      //activate clubs
      clubChecker = true;
    }
  }
  if (clubChecker) {
    clubPower = totalDamage * 2;
  } else {
    clubPower = totalDamage;
  }

  return { spadePower, diamondPower, heartPower, clubPower };
};

export default suitActivation;
