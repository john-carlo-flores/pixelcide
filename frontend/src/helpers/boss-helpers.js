export function updateBossCondition(boss, castleDeck, discardDeck, tavernDeck) {
  let bossCondition = {};

  // Check if overkill, put boss to discard
  if (boss.stats.health < 0) {
    tavernDeck.push(castleDeck.pop());
    bossCondition.defeated = true;
  }

  // Check if exact kill, put boss to top of tavern
  if (boss.stats.health === 0) {
    discardDeck.push(castleDeck.pop());
    bossCondition.defeated = true;
  }

  // if no more bosses, change status to game over win
  if (castleDeck.length === 0) {
    bossCondition.gameOver = true;
  }

  // if boss defeated, go to next boss and reset Jester
  if (bossCondition.defeated && !bossCondition.gameOver) {
    boss.current = castleDeck.at(-1);
    boss.stats = {
      damage: boss.current.damage,
      health: boss.current.health,
      suit: boss.current.suit,
      powerDisabled: false,
    };
    boss.preview = {
      damage: null,
      health: null,
    };
  }

  return bossCondition;
}
