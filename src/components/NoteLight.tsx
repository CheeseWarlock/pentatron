interface NoteLightProps {
  active: boolean;
  glowing: boolean;
  onClick: () => void;
}

export const NoteLight = ({ active,glowing, onClick }: NoteLightProps) => {
  return (
    <div className="p-1 cursor-pointer" onClick={onClick}>
      <div
        style={ { boxShadow: glowing ? '0 0px 6px 3px var(--color-amber-500)' : 'none' } }
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
