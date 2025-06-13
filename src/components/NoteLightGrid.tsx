import { useMemo } from "react";

import PlayerGridColumn from "./PlayerGridColumn";

function NoteLightGrid({ noteGrid, activeColumn, onNoteGridUpdate }: { noteGrid: boolean[][], activeColumn: number, onNoteGridUpdate: (row: number, col: number) => void }) {
  const noteGridElements = useMemo(() => {
    return (noteGrid.map((col, colIndex) => (
      <PlayerGridColumn
        key={`col-${colIndex}`}
        column={colIndex}
        activeNotes={col}
        isCurrentColumn={activeColumn === colIndex}
        onNoteGridUpdate={onNoteGridUpdate} />
    )))

  }, [noteGrid, activeColumn, onNoteGridUpdate]);
  
  return (
    <>
      {noteGridElements}
    </>
  )
}

export default NoteLightGrid;