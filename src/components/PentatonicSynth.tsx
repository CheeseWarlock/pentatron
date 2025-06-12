import { useCallback, useMemo, useState } from 'react';
import PentatonicScaleBuilder from './PentatonicScaleBuilder';
import RootSelector from './RootSelector';
import PentatonicScale from '../PentatonicScale';
import type { Semitones } from '../PentatonicScale';
import PlayerGrid from './PlayerGrid';
import BPMSelector from './BPMSelector';
import Evolver from './Evolver';

export const PATTERN_LENGTH = 16;
export const PITCH_COUNT = 10;

const initialNoteGrid = Array.from({ length: PATTERN_LENGTH }, () => Array(PITCH_COUNT).fill(false));
[[0, 9], [2, 8], [4, 7], [6, 6], [8, 5]].forEach(([col, row]) => {
  if (col == undefined || row == undefined || initialNoteGrid[col] == undefined) return;
  initialNoteGrid[col]![row] = true;
});

/** Randomly toggle a note in the grid */
const evolveGrid = (noteGrid: boolean[][]) => {
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

const evolveTones = (semitones: Semitones) => {
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
  return newTones.sort((a, b) => a - b);
}

export const PentatonicSynth = () => {
  const [root, setRoot] = useState<number>(256);
  const [bpm, setBPM] = useState<number>(80);
  const [semitones, setSemitones] = useState<number[]>([2, 4, 7, 11]);
  const [noteGrid, setNoteGrid] = useState<boolean[][]>(initialNoteGrid);
  const [autoEvolveNoteGrid, setAutoEvolveNoteGrid] = useState<boolean>(false);
  const [autoEvolveTones, setAutoEvolveTones] = useState<boolean>(false);

  const handleRootSet = (newRoot: number) => {
    setRoot(newRoot);
  };

  const handleScaleSet = (notes: number[]) => {
    setSemitones(notes);
  };

  const handleBPMSet = (newBPM: number) => {
    setBPM(newBPM);
  };

  const doEvolveTones = useCallback(() => {
    setSemitones(evolveTones(semitones as Semitones));
  }, [semitones]);

  const handleNoteGridUpdate = useMemo(() => {
    return (row: number, col: number, value: boolean) => {
      const countInThisColumn = noteGrid[col]?.filter(Boolean).length ?? 0;
      if (value && countInThisColumn >= 3) return;
  
      if (noteGrid[col] == undefined) return;
  
      const newColumn = [...noteGrid[col]!];
      newColumn[row] = value;
  
      const newNoteGrid = noteGrid.map((row) => [...row]);
      newNoteGrid[col] = newColumn;
      setNoteGrid(newNoteGrid);
    };
  }, [noteGrid]);

  const evolveNoteGrid = useCallback(() => {
    setNoteGrid(evolveGrid(noteGrid));
  }, [noteGrid]);

  const maybeEvolve = () => {
    if (autoEvolveNoteGrid) {
      evolveNoteGrid();
    }
    if (autoEvolveTones) {
      doEvolveTones();
    }
  };

  const scale: PentatonicScale = new PentatonicScale(root, semitones as Semitones);

  const psb = useMemo(() => {
    return <PentatonicScaleBuilder 
    initialSelectedNotes={semitones}
    onSet={handleScaleSet}
  />
  }, [semitones]);

  const rs = useMemo(() => {
    return <RootSelector root={root} onSet={handleRootSet} />
  }, [root]);

  const bps = useMemo(() => {
    return <BPMSelector bpm={bpm} onSet={handleBPMSet} />
  }, [bpm]);

  const noteGridEvolver = useMemo(() => {
    return <Evolver onAuto={() => setAutoEvolveNoteGrid(!autoEvolveNoteGrid)} onTrigger={evolveNoteGrid} name="Evolve Ptn." />
  }, [autoEvolveNoteGrid, evolveNoteGrid]);

  const scaleEvolver = useMemo(() => {
    return <Evolver onAuto={() => setAutoEvolveTones(!autoEvolveTones)} onTrigger={doEvolveTones} name="Evolve Scl." />
  }, [autoEvolveTones, doEvolveTones]);

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <div className="flex flex-col items-center gap-4">
        {rs}
        {bps}
        {psb}
      </div>
      <PlayerGrid 
        scale={scale} 
        bpm={bpm} 
        noteGrid={noteGrid}
        onNoteGridUpdate={handleNoteGridUpdate}
        onCycleFinished={maybeEvolve}
      />
      {noteGridEvolver}
      {scaleEvolver}
    </div>
  );
};

export default PentatonicSynth; 