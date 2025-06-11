import { useState } from 'react';
import PentatonicScaleBuilder from './PentatonicScaleBuilder';
import RootSelector from './RootSelector';
import PentatonicScale from '../PentatonicScale';
import type { Semitones } from '../PentatonicScale';
import PlayerGrid from './PlayerGrid';
import BPMSelector from './BPMSelector';
import Evolver from './Evolver';

const PATTERN_LENGTH = 16;
const PITCH_COUNT = 10;

const initialNoteGrid = Array.from({ length: PITCH_COUNT }, () => Array(PATTERN_LENGTH).fill(false));
[[0, 9], [2, 8], [4, 7], [6, 6], [8, 5]].forEach(([col, row]) => {
  if (row !== undefined && col !== undefined && initialNoteGrid[row] !== undefined) {
    initialNoteGrid[row][col] = true;
  }
});

/** Randomly toggle a note in the grid */
const evolveGrid = (noteGrid: boolean[][]) => {
  let randomRow = Math.floor(Math.random() * PITCH_COUNT);
  const randomCol = Math.floor(Math.random() * PATTERN_LENGTH);
  const countInThisColumn = noteGrid.map(row => row[randomCol]).filter(Boolean).length;
  
  const newNoteGrid = noteGrid.map((row) => [...row]);
  if (countInThisColumn >= 3) {
    const onInThisColumn = noteGrid.map((row, index) => ({value: row[randomCol], index: index})).filter((item) => item.value);
    const randomOn = onInThisColumn[Math.floor(Math.random() * onInThisColumn.length)];
    if (randomOn !== undefined) {
      randomRow = randomOn.index;
    }
  }
  if (newNoteGrid[randomRow] === undefined) return noteGrid;
  const thisColumn = newNoteGrid[randomRow];
  if (thisColumn === undefined) return noteGrid;
  thisColumn[randomCol] = !thisColumn[randomCol];
  return newNoteGrid;
}

export const PentatonicSynth = () => {
  const [root, setRoot] = useState<number>(256);
  const [bpm, setBPM] = useState<number>(80);
  const [selectedNotes, setSelectedNotes] = useState<number[]>([2, 4, 7, 11]);
  const [noteGrid, setNoteGrid] = useState<boolean[][]>(initialNoteGrid);
  const [autoEvolveNoteGrid, setAutoEvolveNoteGrid] = useState<boolean>(false);

  const handleRootSet = (newRoot: number) => {
    setRoot(newRoot);
  };

  const handleScaleSet = (notes: number[]) => {
    setSelectedNotes(notes);
  };

  const handleBPMSet = (newBPM: number) => {
    setBPM(newBPM);
  };

  const handleNoteGridUpdate = (row: number, col: number, value: boolean) => {
    const countInThisColumn = noteGrid.map(row => row[col]).filter(Boolean).length;
    if (value && countInThisColumn >= 3) return;
    const newNoteGrid = noteGrid.map((row) => [...row]);
    if (newNoteGrid[row] === undefined) return;

    newNoteGrid[row][col] = value;
    setNoteGrid(newNoteGrid);
  };

  const evolveNoteGrid = () => {
    setNoteGrid(evolveGrid(noteGrid));
  };

  const maybeEvolveNoteGrid = () => {
    if (autoEvolveNoteGrid) {
      evolveNoteGrid();
    }
  };

  const scale: PentatonicScale = new PentatonicScale(root, selectedNotes as Semitones);

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <div className="flex flex-col items-center gap-4">
        <RootSelector onSet={handleRootSet} />
        <BPMSelector onSet={handleBPMSet} />
        <PentatonicScaleBuilder 
          selectedNotes={selectedNotes}
          onSet={handleScaleSet}
        />
      </div>
      <PlayerGrid 
        scale={scale} 
        bpm={bpm} 
        noteGrid={noteGrid}
        onNoteGridUpdate={handleNoteGridUpdate}
        onCycleFinished={maybeEvolveNoteGrid}
      />
      <Evolver onAuto={() => setAutoEvolveNoteGrid(!autoEvolveNoteGrid)} onTrigger={evolveNoteGrid} name="Evolve Ptn." />
    </div>
  );
};

export default PentatonicSynth; 