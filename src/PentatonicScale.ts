export type Semitones = [number, number, number, number];

/**
 * A pentatonic scale.
 * Consists of 5 notes: the root and the four semitones.
 */
class PentatonicScale {
  private semitones: Semitones;
  private root: number;

  constructor(root: number, semitones: Semitones) {
    this.root = root;
    this.semitones = semitones;
  }

  /**
   * Get all notes in this scale between the given frequencies.
   */
  getNotes(from: number, to: number) {
    const semitonesWithRoot = [0, ...this.semitones];
    const notes: number[] = [];
    let currentOctaveStart = this.root;
    while (currentOctaveStart > from) {
      currentOctaveStart /= 2;
    }
    while (currentOctaveStart < to) {
      semitonesWithRoot.forEach(semitone => {
        const candidate = currentOctaveStart * Math.pow(2, semitone / 12);
        if (candidate >= from && candidate < to) {
          notes.push(candidate);
        }
      });
      currentOctaveStart *= 2;
    }
    return notes;
  }
}

export default PentatonicScale;