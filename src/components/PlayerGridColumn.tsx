import NoteLight from "./NoteLight";

const notes = Array.from({ length: 10 }, (_, i) => i);

function PlayerGridColumn({
  column, activeNotes, isCurrentColumn, onNoteGridUpdate
}: {
  column: number, activeNotes: boolean[], isCurrentColumn: boolean, onNoteGridUpdate: (row: number, col: number, value: boolean) => void
}) {
  return (<div className="flex flex-col">
    {notes.map((_note, rowIndex) => (
      <NoteLight
        key={`${rowIndex}`}
        active={activeNotes[rowIndex] ?? false}
        glowing={(activeNotes[rowIndex] ?? false) && isCurrentColumn}
        onClick={() => onNoteGridUpdate(rowIndex, column, !activeNotes[rowIndex])}
      />
    ))}
  </div>)
}

export default PlayerGridColumn;