interface NoteLightProps {
  active: boolean;
  glowing: boolean;
  onClick: () => void;
}

export const NoteLight = ({ active,glowing, onClick }: NoteLightProps) => {
  return (
    <div 
      className={`w-8 h-8 rounded-full cursor-pointer
                ${glowing 
                  ? 'bg-amber-200' 
                  : active ? 'bg-amber-500' : 'bg-amber-900'
                }
                transition-colors
                ${glowing 
                  ? 'duration-100' 
                  : 'duration-500'
                }`}
      onClick={onClick}
    />
  );
};

export default NoteLight;
