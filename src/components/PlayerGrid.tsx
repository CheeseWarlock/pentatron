import { useMemo, useRef, useEffect, useState } from "react";
import PentatonicScale from "../PentatonicScale";
import { Synth, Loop, getTransport, PolySynth } from "tone";
import NoteLightGrid from "./NoteLightGrid";
import { PATTERN_LENGTH, PITCH_COUNT } from "./PentatonicSynth";
import RootIndicatorColumn from "./RootIndicatorColumn";

interface PlayerGridProps {
  scale: PentatonicScale;
  bpm: number;
  noteGrid: boolean[][];
  onNoteGridUpdate: (row: number, col: number) => void;
  onCycleFinished: () => void;
  playing: boolean;
}

/**
 * The main component for the player grid. Handles audio playback.
 */
const PlayerGrid = ({ scale, bpm, noteGrid, onNoteGridUpdate, onCycleFinished, playing }: PlayerGridProps) => {
  const scaleRef = useRef(scale);
  const noteGridRef = useRef(noteGrid);
  const callbackRef = useRef(onCycleFinished);
  const [activeColumn, setActiveColumn] = useState<number | null>(null);
  getTransport().bpm.value = bpm;
  
  useEffect(() => {
    scaleRef.current = scale;
  }, [scale]);
  useEffect(() => {
    noteGridRef.current = noteGrid;
  }, [noteGrid]);
  useEffect(() => {
    callbackRef.current = onCycleFinished;
  }, [onCycleFinished]);

  const toneTransport = useMemo(() => {
    const synthA = new PolySynth(Synth).toDestination();

    new Loop((_time) => {
      callbackRef.current();
    }, "1m").start(`0:0:15`);

    for (let i = 0; i < PATTERN_LENGTH; i++) {
      new Loop((time) => {
        setActiveColumn(i);
        const noteEnabledForNow = noteGridRef.current[i]!;
        const notesToPlay = noteEnabledForNow.map((enabled, index) => enabled ? scaleRef.current.getNotes(250, 1000)[PITCH_COUNT - 1 - index] : null).filter((note) => note !== null);
        notesToPlay.forEach(note => { if (note) synthA.triggerAttackRelease(note, "16n", time, (i % 2 == 0) ? 1 : 0.85); });
      }, "1m").start(`0:0:${i}`);
    }
    return getTransport();
  }, []);

  useEffect(() => {
    if (playing) {
      toneTransport.start();
    } else {
      toneTransport.stop();
      setActiveColumn(null);
    }
  }, [playing, toneTransport]);

  const noteLightGrid = useMemo(() => {
    return <NoteLightGrid noteGrid={noteGrid} activeColumn={activeColumn ?? -1} onNoteGridUpdate={onNoteGridUpdate} />
  }, [noteGrid, activeColumn, onNoteGridUpdate]);

  const rootIndicatorColumn = useMemo(() => {
    return <RootIndicatorColumn scale={scale} />
  }, [scale]);

  return (
    <div className="grid grid-cols-17 grid-rows-11 grid-flow-col items-center justify-items-center">
      {rootIndicatorColumn}
    {noteLightGrid}
    </div>
  );
};

export default PlayerGrid;