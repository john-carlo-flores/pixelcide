export function updateCycle(cycle) {
  cycle.current.shift();
  return cycle.current.length === 0;
}

export function resetCycle(cycle) {
  // Only have to reposition cycle if current cycle is reduced
  if (cycle.current.length !== cycle.original.length) {
    // If cycle completed, just use original copy
    if (cycle.current.length === 0) {
      cycle.current = [...cycle.original];
    } else {
      let currentPosition = cycle.original.indexOf(cycle.current.at(-1));

      // Fill current cycle with unfilled positions
      while (cycle.current.length !== cycle.original.length) {
        currentPosition = nextPosition(currentPosition, cycle.original);
        cycle.current.push(cycle.original[currentPosition]);
      }
    }
  }
}

function nextPosition(currentPosition, array) {
  if (currentPosition + 1 === array.length) {
    return 0;
  }

  return currentPosition + 1;
}
