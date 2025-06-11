import { useEffect, useState } from 'react';
import ActionButton from './ActionButton';
import IndicatorLight from './IndicatorLight';
import FlatContainer from './FlatContainer';

const SCALE = [
  "Root",
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
  initialSelectedNotes: number[];
  onSet?: (selectedNotes: number[]) => void;
}

export const PentatonicScaleBuilder = ({ initialSelectedNotes, onSet }: PentatonicScaleBuilderProps) => {
  const [selectedNotes, setSelectedNotes] = useState<number[]>(initialSelectedNotes);
  const [modified, setModified] = useState<boolean>(false);
  const rotate = -3;

  const handleNoteClick = (noteIndex: number) => {
    setSelectedNotes(prev => {
      const newSelection = prev.includes(noteIndex)
        ? prev.filter(n => n !== noteIndex)
        : [...prev, noteIndex].sort((a, b) => a - b);
      setModified(true);
      return newSelection;
    });
  };

  const handleSetClick = () => {
    if (selectedNotes.length === 4) {
      onSet?.(selectedNotes);
      setModified(false);
    }
  };

  const handleResetClick = () => {
    setSelectedNotes(initialSelectedNotes);
    setModified(false);
  };

  useEffect(() => {
    if (!modified) {
      setSelectedNotes(initialSelectedNotes);
    }
  }, [initialSelectedNotes, modified]);

  return (
    <FlatContainer title="Scale">
      <div className="w-64 h-64 flex flex-col justify-center items-center rounded-lg shadow-md">
        <div className="relative w-[300px] h-[300px] flex justify-center items-center">
          {SCALE.map((_name, noteIndex) => (
            <>
              {noteIndex === 0 &&
                <div
                  className="w-10 h-10 rounded-md border-2 flex items-center justify-center text-sm font-bold"
                  style={{
                    position: 'absolute',
                    transform: `rotate(${((noteIndex + rotate) * 360) / 12}deg) translate(120px) rotate(${-((noteIndex + rotate) * 360) / 12}deg)`,
                  }}
                >Root</div>}
              {noteIndex > 0 &&
                <ActionButton
                  halfWidth={true}
                  key={noteIndex}
                  onClick={() => handleNoteClick(noteIndex)}
                  angle={((270 + 360) - noteIndex * 30) % 360}
                  style={{
                    position: 'absolute',
                    transform: `rotate(${((noteIndex + rotate) * 360) / 12}deg) translate(120px)`,
                  }}
                />
              }
              <IndicatorLight isOn={noteIndex === 0 || (modified ? selectedNotes : initialSelectedNotes).includes(noteIndex)} style={{
                position: 'absolute',
                transform: `rotate(${((noteIndex + rotate) * 360) / 12}deg) translate(80px) rotate(${-((noteIndex + rotate) * 360) / 12}deg)`,
              }} />
            </>
          ))}
        </div>
      </div>
      <div className="flex flex-row mt-4 gap-2 w-full justify-between items-center px-6">
        <div className="flex flex-row gap-2 items-center">
          <ActionButton onClick={handleSetClick} />
          <span>Set</span>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <IndicatorLight isOn={selectedNotes.length === 4} />
          <span>Valid</span>
        </div>
      </div>
      <div className="flex flex-row mt-4 gap-2 w-full justify-between items-center px-6">
        <div className="flex flex-row gap-2 items-center">
          <ActionButton onClick={handleResetClick} />
          <span>Reset</span>
        </div>
        <div className="flex flex-row gap-2 items-center">
        <IndicatorLight isOn={modified} />
          <span>Modified</span>
        </div>
      </div>
    </FlatContainer>
  );
};

export default PentatonicScaleBuilder; 