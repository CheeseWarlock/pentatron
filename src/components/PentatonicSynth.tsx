import { useCallback, useMemo, useState } from 'react';
import PentatonicScaleBuilder from './PentatonicScaleBuilder';
import RootSelector from './RootSelector';
import PentatonicScale from '../PentatonicScale';
import type { Semitones } from '../PentatonicScale';
import PlayerGrid from './PlayerGrid';
import BPMSelector from './BPMSelector';
import Evolver from './Evolver';
import { evolvePattern } from '../utils';
import PlayPauseButton from './PlayPauseButton';
import TitleText from './TitleText';
import { evolveTonesNicely } from '../utils';

export const PATTERN_LENGTH = 16;
export const PITCH_COUNT = 10;

const initialNoteGrid = Array.from({ length: PATTERN_LENGTH }, () => Array(PITCH_COUNT).fill(false));
[[0, 9], [2, 8], [4, 7], [6, 6], [8, 5]].forEach(([col, row]) => {
  if (col == undefined || row == undefined || initialNoteGrid[col] == undefined) return;
  initialNoteGrid[col]![row] = true;
});

/**
 * The main Pentatron component.
 * Contains all the UI as well as audio logic (via PlayerGrid).
 */
export const PentatonicSynth = () => {
  const [root, setRoot] = useState<number>(256);
  const [bpm, setBPM] = useState<number>(90);
  const [semitones, setSemitones] = useState<number[]>([2, 4, 7, 9]);
  const [noteGrid, setNoteGrid] = useState<boolean[][]>(initialNoteGrid);
  const [autoEvolveNoteGrid, setAutoEvolveNoteGrid] = useState<boolean>(false);
  const [autoEvolveTones, setAutoEvolveTones] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);

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
    setSemitones(evolveTonesNicely(semitones as Semitones));
  }, [semitones]);

  const handleNoteGridUpdate = useMemo(() => {
    return (row: number, col: number) => {
      const currentValue = noteGrid[col]![row]!;

      const countInThisColumn = noteGrid[col]?.filter(Boolean).length ?? 0;
      if ((!currentValue) && countInThisColumn >= 3) return;
  
      if (noteGrid[col] == undefined) return;
  
      const newColumn = [...noteGrid[col]!];
      newColumn[row] = !currentValue;
  
      const newNoteGrid = noteGrid.map((row) => row);
      newNoteGrid[col] = newColumn;
      setNoteGrid(newNoteGrid);
    };
  }, [noteGrid]);

  const outerNoteGridUpdate = useCallback((row: number, col: number) => {
    handleNoteGridUpdate(row, col);
  }, [handleNoteGridUpdate]);

  const evolveNoteGrid = useCallback(() => {
    setNoteGrid(evolvePattern(noteGrid));
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
    <div className="flex flex-col items-center gap-4 p-8">
      <TitleText />
      <div className="flex flex-row gap-4 items-stretch">
        <div className="flex flex-col items-center flex-1">
          <div className="flex-1 flex items-center justify-center">
            <PlayPauseButton playing={playing} togglePlaying={() => setPlaying(!playing)} />
          </div>
          <div className="flex flex-row items-center gap-4">
            {rs}
            {bps}
          </div>
        </div>
        
        {psb}
      </div>
      <div className="flex flex-row items-center gap-4 justify-around w-full">
        {noteGridEvolver}
        {scaleEvolver}
      </div>
      <PlayerGrid 
        scale={scale} 
        bpm={bpm} 
        noteGrid={noteGrid}
        onNoteGridUpdate={outerNoteGridUpdate}
        onCycleFinished={maybeEvolve}
        playing={playing}
      />
    </div>
  );
};

export default PentatonicSynth; 