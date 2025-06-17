import NoteLight from "./NoteLight";
import IndicatorLight from "./IndicatorLight";

const notes = Array.from({ length: 10 }, (_, i) => i);

interface NoteLightColumnProps {
  column: number;
  activeNotes: boolean[];
  isCurrentColumn: boolean;
  onNoteGridUpdate: (row: number, col: number) => void;
}

/**
 * A column of note lights with a current column indicator at the top.
 */
function NoteLightColumn({
  column, activeNotes, isCurrentColumn, onNoteGridUpdate
}: NoteLightColumnProps) {
  return (<>
    <IndicatorLight isOn={isCurrentColumn} />
    {notes.map((_note, rowIndex) => (
      <NoteLight
        row={rowIndex}
        col={column}
        key={`${rowIndex}`}
        state={activeNotes[rowIndex] ? (isCurrentColumn ? "high" : "low") : "off"}
        onClick={onNoteGridUpdate}
      />
    ))}
  </>)
}

export default NoteLightColumn;