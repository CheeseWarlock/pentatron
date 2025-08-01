import { useCallback } from "react";

interface NoteLightProps {
  state: NoteLightState;
  onClick: (row: number, col: number) => void;
  row: number;
  col: number;
  style?: React.CSSProperties;
}

type NoteLightState = "off" | "low" | "high";

/**
 * A medium-sized yellow light with touch interaction.
 * Has 3 brightness states: off, low, and high.
 */
export const NoteLight = ({ state, onClick, row, col, style }: NoteLightProps) => {
  const handleClick = useCallback(() => {
    onClick(row, col);
  }, [onClick, row, col]);

  return (
    <div className="relative p-1 cursor-pointer" onClick={handleClick} style={style}>
      <div
        className={`w-8 h-8 rounded-full bg-radial-[at_50%_12px] from-amber-800 to-amber-900 to-50% absolute`}
      />
      <div
        style={ { boxShadow: state === "high" ? '0 0px 6px 3px var(--color-amber-400)' : '0 0px 4px 2px var(--color-amber-600)' } }
        className={`relative z-1 transition-all w-8 h-8 rounded-full ${state === "off" ? 'opacity-0' : 'opacity-100'} ${state === "high" ? 'duration-75 bg-amber-200' : 'duration-200 bg-amber-500'}`} />
    </div>
  );
};

export default NoteLight;
