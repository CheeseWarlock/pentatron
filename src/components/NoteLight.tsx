import { useCallback } from "react";

interface NoteLightProps {
  active: boolean;
  glowing: boolean;
  onClick: (row: number, col: number) => void;
  row: number;
  col: number;
}

export const NoteLight = ({ active, glowing, onClick, row, col }: NoteLightProps) => {
  const handleClick = useCallback(() => {
    onClick(row, col);
  }, [onClick, row, col]);

  return (
    <div className="p-1 cursor-pointer" onClick={handleClick}>
      <div
        style={ { boxShadow: glowing ? '0 0px 6px 3px var(--color-amber-400)' : active ? '0 0px 4px 2px var(--color-amber-600)' : 'none' } }
        className={`w-8 h-8 rounded-full
                  ${glowing 
                    ? 'bg-amber-200' 
                    : active ? 'bg-amber-500' : 'bg-amber-900'
                  }
                  transition-all
                  ${glowing 
                    ? 'duration-75' 
                    : 'duration-200'
                  }`}
      />
    </div>
  );
};

export default NoteLight;
