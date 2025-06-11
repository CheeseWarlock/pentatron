import { useState } from 'react';
import PentatonicScaleBuilder from './PentatonicScaleBuilder';
import RootSelector from './RootSelector';
import PentatonicScale from '../PentatonicScale';
import type { Semitones } from '../PentatonicScale';
import PlayerGrid from './PlayerGrid';
import BPMSelector from './BPMSelector';

export const PentatonicSynth = () => {
  const [root, setRoot] = useState<number>(256);
  const [bpm, setBPM] = useState<number>(80);
  const [selectedNotes, setSelectedNotes] = useState<number[]>([2, 4, 7, 11]);

  const handleRootSet = (newRoot: number) => {
    setRoot(newRoot);
  };

  const handleScaleSet = (notes: number[]) => {
    setSelectedNotes(notes);
  };

  const handleBPMSet = (newBPM: number) => {
    setBPM(newBPM);
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
      <PlayerGrid scale={scale} bpm={bpm} />
    </div>
  );
};

export default PentatonicSynth; 