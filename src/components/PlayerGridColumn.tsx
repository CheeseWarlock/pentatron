import NoteLight from "./NoteLight";
import IndicatorLight from "./IndicatorLight";

const notes = Array.from({ length: 10 }, (_, i) => i);

function PlayerGridColumn({
  column, activeNotes, isCurrentColumn, onNoteGridUpdate
}: {
  column: number, activeNotes: boolean[], isCurrentColumn: boolean, onNoteGridUpdate: (row: number, col: number) => void
}) {
  return (<>
    <IndicatorLight isOn={isCurrentColumn} />
    {notes.map((_note, rowIndex) => (
      <NoteLight
        row={rowIndex}
        col={column}
        key={`${rowIndex}`}
        active={activeNotes[rowIndex] ?? false}
        glowing={(activeNotes[rowIndex] ?? false) && isCurrentColumn}
        onClick={onNoteGridUpdate}
      />
    ))}
  </>)
}

export default PlayerGridColumn;