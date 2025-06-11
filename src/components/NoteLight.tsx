interface NoteLightProps {
  active: boolean;
  glowing: boolean;
  onClick: () => void;
}

export const NoteLight = ({ active,glowing, onClick }: NoteLightProps) => {
  return (
    <div className="p-1 cursor-pointer" onClick={onClick}>
      <div 
        className={`w-8 h-8 rounded-full
                  ${glowing 
                    ? 'bg-amber-200' 
                    : active ? 'bg-amber-500' : 'bg-amber-900'
                  }
                  transition-colors
                  ${glowing 
                    ? 'duration-100' 
                    : 'duration-500'
                  }`}
      />
    </div>
  );
};

export default NoteLight;
