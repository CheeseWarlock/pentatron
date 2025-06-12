import { useMemo, useRef, useEffect, useState } from "react";
import PentatonicScale from "../PentatonicScale";
import { Synth, Loop, getTransport, PolySynth } from "tone";
import ActionButton from "./ActionButton";
import FlatContainer from "./FlatContainer";
import IndicatorLight from "./IndicatorLight";
import NoteLightGrid from "./NoteLightGrid";

const PATTERN_LENGTH = 16;
const PITCH_COUNT = 10;
interface PlayerGridProps {
  scale: PentatonicScale;
  bpm: number;
  noteGrid: boolean[][];
  onNoteGridUpdate: (row: number, col: number, value: boolean) => void;
  onCycleFinished: () => void;
}

const PlayerGrid = ({ scale, bpm, noteGrid, onNoteGridUpdate, onCycleFinished }: PlayerGridProps) => {
  const scaleRef = useRef(scale);
  const noteGridRef = useRef(noteGrid);
  const callbackRef = useRef(onCycleFinished);
  const [activeColumn, setActiveColumn] = useState<number | null>(null);
  const [playing, setPlaying] = useState<boolean>(false);
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
  // const notes = scale.getNotes(250, 1000).reverse();

  const togglePlaying = () => {
    if (toneTransport.state === "stopped") {
      toneTransport.start();
      setPlaying(true);
    } else {
      toneTransport.stop();
      setPlaying(false);
    }
  }

  const noteLightGrid = useMemo(() => {
    return <NoteLightGrid scale={scale} noteGrid={noteGrid} activeColumn={activeColumn ?? -1} onNoteGridUpdate={onNoteGridUpdate} />
  }, [scale, noteGrid, activeColumn, onNoteGridUpdate]);

  return (
    <div className="flex flex-row gap-4">
      <FlatContainer title="Play">
        <div className="flex flex-row items-center gap-2">
          <ActionButton onClick={togglePlaying} />
          <IndicatorLight isOn={playing} />
        </div>
      </FlatContainer>
      
      {noteLightGrid}
    </div>
  );
};

export default PlayerGrid;