import { useEffect, useMemo, useState } from 'react';
import ActionButton from './ActionButton';
import IndicatorLight from './IndicatorLight';
import FlatContainer from './FlatContainer';

const SCALE = [
  "Root",
  "2-",
  "2+",
  "3-",
  "3+",
  "4",
  "5-",
  "5",
  "6-",
  "6+",
  "7-",
  "7+"
]

interface PentatonicScaleBuilderProps {
  initialSelectedNotes: number[];
  onSet?: (selectedNotes: number[]) => void;
}

/**
 * The scale builder. Allows the user to select the notes in the scale.
 * Has internal commit/rollback logic.
 */
export const PentatonicScaleBuilder = ({ initialSelectedNotes, onSet }: PentatonicScaleBuilderProps) => {
  const [selectedNotes, setSelectedNotes] = useState<number[]>(initialSelectedNotes);
  const [modified, setModified] = useState<boolean>(false);
  const rotate = -3;

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
    setSelectedNotes(initialSelectedNotes);
    setModified(false);
  }, [initialSelectedNotes]);

  const scaleRing = useMemo(() => {
    const handleNoteClick = (noteIndex: number) => {
      setSelectedNotes(prev => {
        const newSelection = prev.includes(noteIndex)
          ? prev.filter(n => n !== noteIndex)
          : [...prev, noteIndex].sort((a, b) => a - b);
        setModified(true);
        return newSelection;
      });
    };
    return (<div className="relative w-[300px] h-[300px] flex justify-center items-center">
      {SCALE.map((_name, noteIndex) => 
        noteIndex === 0 ?
          <div
            className="w-10 h-10 rounded-md border-2 flex items-center justify-center text-sm font-bold"
            key={`${noteIndex}-root`}
            style={{
              position: 'absolute',
              transform: `rotate(${((noteIndex + rotate) * 360) / 12}deg) translate(120px) rotate(${-((noteIndex + rotate) * 360) / 12}deg)`,
            }}
          >Root</div> :
          <ActionButton
            halfWidth={true}
            key={`${noteIndex}-button`}
            onClick={() => handleNoteClick(noteIndex)}
            angle={((270 + 360) - noteIndex * 30) % 360}
            style={{
              position: 'absolute',
              transform: `rotate(${((noteIndex + rotate) * 360) / 12}deg) translate(120px)`,
            }}
          />
      )}
      {SCALE.map((_name, noteIndex) => (
          <IndicatorLight key={`${noteIndex}-indicator`} isOn={noteIndex === 0 || (modified ? selectedNotes : initialSelectedNotes).includes(noteIndex)} style={{
            position: 'absolute',
            transform: `rotate(${((noteIndex + rotate) * 360) / 12}deg) translate(80px) rotate(${-((noteIndex + rotate) * 360) / 12}deg)`,
          }} />
      ))}
      {SCALE.map((name, noteIndex) => (
          <span key={`${noteIndex}-indicator`} className="pointer-events-none" style={{
            position: 'absolute',
            transform: `rotate(${((noteIndex + rotate) * 360) / 12}deg) translate(120px) rotate(${-((noteIndex + rotate) * 360) / 12}deg) translate(${noteIndex < 6 ? 40 : -40}px, 0)`,
          }}>{noteIndex === 0 || noteIndex === 6 ? "" : name}</span>
      ))}
    </div>)
  }, [initialSelectedNotes, modified, rotate, selectedNotes]);

  return (
    <FlatContainer title="Scale">
      <div className="w-80 h-64 flex flex-col justify-center items-center rounded-lg">
        {scaleRing}
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
      <div className="flex flex-row gap-2 w-full justify-between items-center px-6">
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