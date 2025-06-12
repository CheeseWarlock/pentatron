import IndicatorLight from "./IndicatorLight";
import PlayerGridColumn from "./PlayerGridColumn";

const PATTERN_LENGTH = 16;

function NoteLightGrid({ noteGrid, activeColumn, onNoteGridUpdate }: { noteGrid: boolean[][], activeColumn: number, onNoteGridUpdate: (row: number, col: number, value: boolean) => void }) {
  return (
    <div className="grid grid-rows-[auto_1fr]">
        {/* Column indicators */}
        <div className="grid grid-cols-[repeat(16,1fr)]">
          {Array.from({ length: PATTERN_LENGTH }, (_, i) => (
            <div key={`col-${i}`} className="flex items-center justify-center">
              <IndicatorLight isOn={activeColumn === i} />
            </div>
          ))}
        </div>

        {/* Note grid */}
        <div className="grid grid-cols-[repeat(16,1fr)]">
          {noteGrid.map((col, colIndex) => (
            <PlayerGridColumn
              key={`col-${colIndex}`}
              column={colIndex}
              activeNotes={col}
              isCurrentColumn={activeColumn === colIndex}
              onNoteGridUpdate={onNoteGridUpdate} />
          ))}
        </div>
      </div>
  )
}

export default NoteLightGrid;