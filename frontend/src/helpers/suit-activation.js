const suitActivation = (playerField, currentBoss) => {
  let clubChecker = false;
  let totalDamage = 0;
  let spadePower = 0; // spades reduces boss attack
  let diamondPower = 0; // diamonds we draw cards from tavern
  let heartPower = 0; // hearts we replenish our tavern from discard
  let clubPower = 0; // clubs we double damage

  const suits = [];
  for (const card of playerField) {
    totalDamage += card.damage;

    if (!suits.includes(card.suit) && card.suit !== currentBoss.suit) {
      suits.push(card.suit);
    }
  }

  if (suits.includes('Spades')) {
    //active spades
    spadePower = totalDamage;
  }
  if (suits.includes('Diamonds')) {
    //activate diamonds
    diamondPower = totalDamage;
  }
  if (suits.includes('Hearts')) {
    //activate hearts
    heartPower = totalDamage;
  }

  if (suits.includes('Clubs')) {
    //activate clubs
    clubChecker = true;
  }

  clubPower = totalDamage;

  if (clubChecker) {
    clubPower = totalDamage * 2;
  }

  return { spadePower, diamondPower, heartPower, clubPower };
};

export default suitActivation;
