import { useMemo } from "react";

import NoteLightColumn from "./NoteLightColumn";

/**
 * The grid of note lights.
 */
function NoteLightGrid({ noteGrid, activeColumn, onNoteGridUpdate }: { noteGrid: boolean[][], activeColumn: number, onNoteGridUpdate: (row: number, col: number) => void }) {
  const memoizedList = noteGrid.map((col, colIndex) => {
    const isCurrentColumn = activeColumn === colIndex;
    
    // This is safe because the columns and their order are not changing
    // So the hooks will always be called in the same order, the same number of times
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMemo(() => {
      return <NoteLightColumn
        key={`col-${colIndex}`}
        column={colIndex}
        activeNotes={col}
        isCurrentColumn={isCurrentColumn}
        onNoteGridUpdate={onNoteGridUpdate} />
    }
    // exhaustive-deps gets confused by the hook-in-a-loop
    // The correct deps array is what would be used if we weren't using a hook-in-a-loop
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