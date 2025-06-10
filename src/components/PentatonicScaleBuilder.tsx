import { useState } from 'react';

const SCALE = [
  "2-",
  "2+",
  "3-",
  "3+",
  "4+",
  "5-",
  "5+",
  "6-",
  "6+",
  "7-",
  "7+"
]

interface PentatonicScaleBuilderProps {
  selectedNotes?: number[];
  onSet?: (selectedNotes: number[]) => void;
}

export const PentatonicScaleBuilder = ({ selectedNotes: initialSelectedNotes = [], onSet }: PentatonicScaleBuilderProps) => {
  const [selectedNotes, setSelectedNotes] = useState<number[]>(initialSelectedNotes);
  const rotate = -2;

  const handleNoteClick = (noteIndex: number) => {
    setSelectedNotes(prev => {
      const newSelection = prev.includes(noteIndex)
        ? prev.filter(n => n !== noteIndex)
        : [...prev, noteIndex].sort((a, b) => a - b);
      return newSelection;
    });
  };

  const handleSetClick = () => {
    if (selectedNotes.length === 4) {
      onSet?.(selectedNotes);
    }
  };

  const handleResetClick = () => {
    setSelectedNotes(initialSelectedNotes);
  };

  return (
    <div className="w-[400px] h-[400px] flex justify-center items-center bg-gray-400 rounded-lg shadow-md">
      <div className="relative w-[300px] h-[300px] flex justify-center items-center">
        {SCALE.map((name, noteIndex) => (
          <button
            key={noteIndex}
            className={`absolute w-10 h-10 rounded-md border-none cursor-pointer 
                      flex items-center justify-center text-sm font-bold
                      transition-all duration-200 ease-in-out
                      ${selectedNotes.includes(noteIndex + 1)
                        ? 'bg-blue-500 text-white border-blue-600 hover:bg-blue-600'
                        : 'bg-white text-gray-700 border-gray-700 hover:bg-gray-100'
                      }`}
            onClick={() => handleNoteClick(noteIndex + 1)}
            style={{
              transform: `rotate(${((noteIndex + rotate) * 360) / 12}deg) translate(120px) rotate(${-((noteIndex + rotate) * 360) / 12}deg)`,
            }}
          >
            {name}
          </button>
        ))}
        <div className="absolute w-10 h-10 rounded-md border-2 flex items-center justify-center text-sm font-bold top-[10px]">Root</div>
        <div className="flex flex-col gap-2">
          <button
            onClick={handleSetClick}
            disabled={selectedNotes.length !== 4}
            className={`w-16 h-16 rounded-full border-2 font-bold text-lg
                      transition-all duration-200 ease-in-out
                      ${selectedNotes.length === 4
                        ? 'bg-green-500 text-white border-green-600 hover:bg-green-600 cursor-pointer'
                        : 'bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed'
                      }`}
          >
            Set
          </button>
          <button
            onClick={handleResetClick}
            className="flex justify-center items-center
                      w-16 h-8 rounded-full border-2 font-bold text-sm
                     bg-red-500 text-white border-red-600 hover:bg-red-600
                     transition-all duration-200 ease-in-out"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default PentatonicScaleBuilder; 