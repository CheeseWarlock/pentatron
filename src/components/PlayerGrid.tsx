import { useMemo } from "react";
import PentatonicScale from "../PentatonicScale";
import NoteLight from "./NoteLight";
import { FMSynth, Loop, getTransport } from "tone";

const PATTERN_LENGTH = 16;

const PlayerGrid = ({ scale }: { scale: PentatonicScale }) => {
  const playNote = (index: number, synth: FMSynth, time: number) => {
    console.log(scale.getNotes(250, 1000));
    const note = scale.getNotes(250, 1000)[index];
    if (!note) return;
    synth.triggerAttackRelease(note, "16n", time); 
  }
  
  const toneTransport = useMemo(() => {
    const synthA = new FMSynth().toDestination();

    for (let i = 0; i < PATTERN_LENGTH; i++) {
      new Loop((time) => {
        playNote(i, synthA, time);
      }, "1m").start(`0:0:${i}`);
    }
    return getTransport();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const notes = scale.getNotes(250, 1000);

  return (
    <div className="grid gap-1" onClick={() => toneTransport.start()}>
      {notes.map((note, _rowIndex) => (
        <div key={note} className="flex gap-1">
          {Array.from({ length: PATTERN_LENGTH }, (_, colIndex) => (
            <NoteLight
              key={`${note}-${colIndex}`}
              glowing={false}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default PlayerGrid;