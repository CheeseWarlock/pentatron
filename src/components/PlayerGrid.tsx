import { useMemo, useRef, useEffect, useState } from "react";
import PentatonicScale from "../PentatonicScale";
import NoteLight from "./NoteLight";
import { Synth, Loop, getTransport, PolySynth } from "tone";
import ActionButton from "./ActionButton";

const PATTERN_LENGTH = 16;
const PITCH_COUNT = 10;

const initialNoteGrid = Array.from({ length: PITCH_COUNT }, () => Array(PATTERN_LENGTH).fill(false));
[[0, 9], [2, 8], [4, 7], [6, 6], [8, 5]].forEach(([col, row]) => {
  if (row !== undefined && col !== undefined && initialNoteGrid[row] !== undefined) {
    initialNoteGrid[row][col] = true;
  }
});

const PlayerGrid = ({ scale, bpm }: { scale: PentatonicScale, bpm: number }) => {
  const [noteGrid, setNoteGrid] = useState<boolean[][]>(initialNoteGrid);
  const scaleRef = useRef(scale);
  const noteGridRef = useRef(noteGrid);
  const [activeColumn, setActiveColumn] = useState<number | null>(null);
  getTransport().bpm.value = bpm;
  
  useEffect(() => {
    scaleRef.current = scale;
  }, [scale]);
  useEffect(() => {
    noteGridRef.current = noteGrid;
  }, [noteGrid]);

  const updateNoteGrid = (row: number, col: number, value: boolean) => {
    const countInThisColumn = noteGrid.map(row => row[col]).filter(Boolean).length;
    if (value && countInThisColumn >= 3) return;
    const newNoteGrid = noteGrid.map((row) => [...row]);
    if (newNoteGrid[row] === undefined) return;

    newNoteGrid[row][col] = value;
    setNoteGrid(newNoteGrid);
  }

  const toneTransport = useMemo(() => {
    const synthA = new PolySynth(Synth).toDestination();

    for (let i = 0; i < PATTERN_LENGTH; i++) {
      new Loop((time) => {
        setActiveColumn(i);
        const noteEnabledForNow = noteGridRef.current.map(row => row[i]);
        const notesToPlay = noteEnabledForNow.map((enabled, index) => enabled ? scaleRef.current.getNotes(250, 1000)[PITCH_COUNT - 1 - index] : null).filter((note) => note !== null);
        notesToPlay.forEach(note => { if (note) synthA.triggerAttackRelease(note, "16n", time, (i % 2 == 0) ? 1 : 0.85); });
      }, "1m").start(`0:0:${i}`);
    }
    return getTransport();
  }, []);
  const notes = scale.getNotes(250, 1000);

  return (
    <div className="flex flex-row gap-2">
      <ActionButton onClick={() => toneTransport.start()}>Start the music</ActionButton>
      <div className="grid gap-1">
        {notes.map((note, rowIndex) => (
          <div key={note} className="flex gap-1">
            {Array.from({ length: PATTERN_LENGTH }, (_, colIndex) => (
              <NoteLight
                key={`${rowIndex}-${colIndex}`}
                active={noteGrid[rowIndex]?.[colIndex] ?? false}
                glowing={(noteGrid[rowIndex]?.[colIndex] ?? false) && activeColumn === colIndex}
                onClick={() => updateNoteGrid(rowIndex, colIndex, !noteGrid[rowIndex]?.[colIndex])}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerGrid;