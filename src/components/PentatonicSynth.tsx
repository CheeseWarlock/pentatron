import { useState } from 'react';
import PentatonicScaleBuilder from './PentatonicScaleBuilder';
import RootSelector from './RootSelector';
import NoteGrid from './NoteGrid';
import PentatonicScale from '../PentatonicScale';
import type { Semitones } from '../PentatonicScale';

export const PentatonicSynth = () => {
  const [root, setRoot] = useState<number>(256);
  const [selectedNotes, setSelectedNotes] = useState<number[]>([2, 4, 7, 11]);

  const handleRootSet = (newRoot: number) => {
    setRoot(newRoot);
  };

  const handleScaleSet = (notes: number[]) => {
    setSelectedNotes(notes);
  };

  const scale: PentatonicScale = new PentatonicScale(root, selectedNotes as Semitones);

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <div className="flex flex-col items-center gap-4">
        <RootSelector onSet={handleRootSet} />
        <PentatonicScaleBuilder 
          selectedNotes={selectedNotes}
          onSet={handleScaleSet}
        />
      </div>
      <NoteGrid scale={scale} />
    </div>
  );
};

export default PentatonicSynth; 