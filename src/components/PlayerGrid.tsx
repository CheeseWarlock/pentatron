import { useMemo, useRef, useEffect, useState } from "react";
import PentatonicScale from "../PentatonicScale";
import NoteLight from "./NoteLight";
import { FMSynth, Loop, getTransport, PolySynth } from "tone";

const PATTERN_LENGTH = 16;
const PITCH_COUNT = 10;

const PlayerGrid = ({ scale }: { scale: PentatonicScale }) => {
  const [noteGrid, setNoteGrid] = useState<boolean[][]>(Array.from({ length: scale.getNotes(250, 1000).length }, () => Array(PATTERN_LENGTH).fill(false)));
  const scaleRef = useRef(scale);
  const noteGridRef = useRef(noteGrid);
  getTransport().bpm.value = 80;
  
  useEffect(() => {
    scaleRef.current = scale;
  }, [scale]);
  useEffect(() => {
    noteGridRef.current = noteGrid;
  }, [noteGrid]);

  const updateNoteGrid = (row: number, col: number, value: boolean) => {
    console.log("Setting note grid", row, col, value);
    const newNoteGrid = noteGrid.map((row) => [...row]);
    if (newNoteGrid[row] === undefined) return;

    newNoteGrid[row][col] = value;
    console.log("New note grid", newNoteGrid);
    setNoteGrid(newNoteGrid);
  }

  const toneTransport = useMemo(() => {
    const synthA = new PolySynth(FMSynth).toDestination();

    for (let i = 0; i < PATTERN_LENGTH; i++) {
      new Loop((time) => {
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
      <div onClick={() => toneTransport.start()}>Start the music</div>
      <div className="grid gap-1">
        {notes.map((note, rowIndex) => (
          <div key={note} className="flex gap-1">
            {Array.from({ length: PATTERN_LENGTH }, (_, colIndex) => (
              <NoteLight
                key={`${note}-${colIndex}`}
                glowing={noteGrid[rowIndex]?.[colIndex] ?? false}
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