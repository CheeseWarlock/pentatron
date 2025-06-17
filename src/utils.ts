import { PATTERN_LENGTH, PITCH_COUNT } from "./components/PentatonicSynth";
import type { Semitones } from "./PentatonicScale";

// Python range function
export const range = (start: number, stop: number, step: number) => {
  return Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
};

/**
 * Evolve a pattern by exchanging one false with an adjacent true
 * Ensuring that there's never more than three trues in a single column
 * @param pattern 2D array of booleans; columns followed by rows
 * @returns 2D array of booleans
 */
export const evolvePattern = (pattern: boolean[][]) => {
  let found = false;
  let escape = 100;
  while (!found && escape > 0) {
    // Pick a column that has at least one true
    const validCols = pattern.map((col, idx) => ({ valid: col.some(Boolean), idx: idx })).filter(c => c.valid);
    if (validCols.length === 0) {
      console.warn("No valid columns found");
      break;
    }
    // Pick one at random
    const col = validCols[Math.floor(Math.random() * validCols.length)]!.idx;
    const row = Math.floor(Math.random() * pattern[col]!.length);

    // Pick a random adjacent cell
    const adjacent: [number, number][] = [];
    if (col > 0) adjacent.push([col - 1, row]);
    if (col < pattern.length - 1) adjacent.push([col + 1, row]);
    if (row > 0) adjacent.push([col, row - 1]);
    if (row < pattern[col]!.length - 1) adjacent.push([col, row + 1]);

    const adj = adjacent[Math.floor(Math.random() * adjacent.length)]!;
    const adjacentValue = pattern[adj[0]!]![adj[1]!]!;
    const currentValue = pattern[col]![row]!;

    if (currentValue !== adjacentValue) {
      const countInTargetColumn = pattern[currentValue ? adj[0]! : col]!.filter(Boolean).length;
      if (countInTargetColumn < 3 || col === adj[0]!) {
        pattern[col]![row] = adjacentValue;
        pattern[adj[0]!]![adj[1]!] = currentValue;
        found = true;
      }
    }
    escape--;
  }
  if (escape === 0) {
    console.warn("Failed to evolve pattern");
  }
  return pattern.map((col) => [...col]);
}

/**
 * Swap two random tones in the semitone array.
 */
export const evolveTones = (semitones: Semitones): Semitones => {
  const newTones = [...semitones];
  const tonesByState = (new Array(11)).fill(0).map((_, index) => {
    return { idx: index + 1, state: semitones.includes(index + 1) };
  });
  const trueTones = tonesByState.filter((tone) => tone.state);
  const falseTones = tonesByState.filter((tone) => !tone.state);

  const toneToAdd = falseTones[Math.floor(Math.random() * falseTones.length)];
  const toneToRemove = trueTones[Math.floor(Math.random() * trueTones.length)];

  if (toneToAdd !== undefined && toneToRemove !== undefined) {
    newTones.push(toneToAdd.idx);
    newTones.splice(newTones.indexOf(toneToRemove.idx), 1);
  }
  return newTones.sort((a, b) => a - b) as Semitones;
}

/**
 * Calculate unpleasantness for evolveTonesNicely.
 */
export const unpleasantness = (semitones: Semitones): number => {
  const semitonesWithZero = [0, ...semitones];
  const semitonesWithTwelve = [...semitones, 12];
  return semitonesWithZero.reduce((acc, tone) => {
    const result = (semitonesWithTwelve.includes(tone + 1) ? 1 : 0) + (semitonesWithTwelve.includes(tone + 6) && tone !== 6 ? 1 : 0);
    return acc +result;
  }, 0);
}

/**
 * Try two different evolutions, and return the one that results in fewer unpleasant intervals.
 * Unpleasant intervals are intervals that are 1 or 6 semitones apart.
 */
export const evolveTonesNicely = (semitones: Semitones): Semitones => {
  const firstAttempt = evolveTones(semitones);
  const secondAttempt = evolveTones(semitones);

  if (unpleasantness(firstAttempt) < unpleasantness(secondAttempt)) {
    return firstAttempt;
  } else {
    return secondAttempt;
  }
}

/**
 * Flip a random note in a random column.
 * Ensures that there's never more than three trues in a single column.
 */
export const oldEvolvePattern = (noteGrid: boolean[][]) => {
  let randomRow = Math.floor(Math.random() * PITCH_COUNT);
  const randomCol = Math.floor(Math.random() * PATTERN_LENGTH);

  if (noteGrid[randomCol] == undefined) return noteGrid;
  const countInThisColumn = noteGrid[randomCol].filter(Boolean).length;
  
  const newNoteGrid = noteGrid.map((col) => [...col]);
  if (countInThisColumn >= 3) {
    const onInThisColumn = noteGrid[randomCol].map((item, index) => ({value: item, index: index})).filter((item) => item.value);
    const randomOn = onInThisColumn[Math.floor(Math.random() * onInThisColumn.length)];
    if (randomOn !== undefined) {
      randomRow = randomOn.index;
    }
  }
  if (newNoteGrid[randomCol] === undefined) return noteGrid;
  const thisColumn = newNoteGrid[randomCol];
  if (thisColumn === undefined) return noteGrid;
  thisColumn[randomRow] = !thisColumn[randomRow];
  return newNoteGrid;
}