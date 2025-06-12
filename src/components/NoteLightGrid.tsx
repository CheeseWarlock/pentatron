import { useMemo } from "react";
import  PentatonicScale from "../PentatonicScale"
import IndicatorLight from "./IndicatorLight";

import PlayerGridColumn from "./PlayerGridColumn";

function NoteLightGrid({ scale, noteGrid, activeColumn, onNoteGridUpdate }: { scale: PentatonicScale, noteGrid: boolean[][], activeColumn: number, onNoteGridUpdate: (row: number, col: number, value: boolean) => void }) {
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
        <div className="grid grid-cols-17 grid-rows-11 grid-flow-col items-center justify-items-center">
          <div className="self-end">Root</div>
          {Array.from({ length: 10 }, (_, i) => (
            <div key={`row-${i}`} className="flex items-center justify-center">
              <IndicatorLight isOn={scale.getRoots(250, 1000).includes(scale.getNotes(250, 1000)![10 - 1 - i]!)} />
            </div>
          ))}
          {noteGridElements}
        </div>
  )
}

export default NoteLightGrid;