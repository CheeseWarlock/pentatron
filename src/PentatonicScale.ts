class PentatonicScale {
  private semitones: number[] = [];
  private root: number;

  constructor(root: number, semitones: number[]) {
    this.root = root;
    this.semitones = semitones;
  }

  /**
   * Get all notes in this scale between the given frequencies.
   */
  getNotes(from: number, to: number) {
    const notes: number[] = [];
    let currentOctaveStart = this.root;
    while (currentOctaveStart > from) {
      currentOctaveStart /= 2;
    }
    while (currentOctaveStart < to) {
      this.semitones.forEach(semitone => {
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