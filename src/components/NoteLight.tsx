import { useCallback } from "react";

interface NoteLightProps {
  state: NoteLightState;
  onClick: (row: number, col: number) => void;
  row: number;
  col: number;
}

type NoteLightState = "off" | "low" | "high";

/**
 * A single note light.
 * Has 3 brightness states: off, low, and high.
 */
export const NoteLight = ({ state, onClick, row, col }: NoteLightProps) => {
  const handleClick = useCallback(() => {
    onClick(row, col);
  }, [onClick, row, col]);

  return (
    <div className="p-1 cursor-pointer" onClick={handleClick}>
      <div
        style={ { boxShadow: state === "high" ? '0 0px 6px 3px var(--color-amber-400)' : state === "low" ? '0 0px 4px 2px var(--color-amber-600)' : 'none' } }
        className={`w-8 h-8 rounded-full
                  ${state === "high" 
                    ? 'bg-amber-200' 
                    : state === "low" ? 'bg-amber-500' : 'bg-amber-900'
                  }
                  transition-all
                  ${state === "high" 
                    ? 'duration-75' 
                    : 'duration-200'
                  }`}
      />
    </div>
  );
};

export default NoteLight;
