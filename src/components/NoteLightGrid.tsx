import { useMemo } from "react";

import PlayerGridColumn from "./PlayerGridColumn";

function NoteLightGrid({ noteGrid, activeColumn, onNoteGridUpdate }: { noteGrid: boolean[][], activeColumn: number, onNoteGridUpdate: (row: number, col: number) => void }) {
  const memoizedList = noteGrid.map((col, colIndex) => {
    const isCurrentColumn = activeColumn === colIndex;
    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMemo(() => {
      return <PlayerGridColumn
        key={`col-${colIndex}`}
        column={colIndex}
        activeNotes={col}
        isCurrentColumn={isCurrentColumn}
        onNoteGridUpdate={onNoteGridUpdate} />
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  , [isCurrentColumn, onNoteGridUpdate])

  }

);

  
  return (
    <>
      {memoizedList}
    </>
  )
}

export default NoteLightGrid;