export function updateBossCondition(boss, castleDeck, discardDeck, tavernDeck, cycle) {
  let bossDefeated = false;
  let gameOver = false;
  
  // Check if overkill, put boss to discard
  if (boss.stats.health < 0) {
    tavernDeck.push(castleDeck.pop());
    bossDefeated = true;
  }

  // Check if exact kill, put boss to top of tavern
  if (boss.stats.health === 0) {
    discardDeck.push(castleDeck.pop());
    bossDefeated = true;
  }

  // if no more bosses, change status to game over win
  if (castleDeck.length === 0) {
    setStatus("game_over_win")
    gameOver = true;
  }

  // if boss defeated, go to next boss
  if (bossDefeated && !gameOver) {
    boss.current = castleDeck.at(-1);
  }

  return bossDefeated;
}