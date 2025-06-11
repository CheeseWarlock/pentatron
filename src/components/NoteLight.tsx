interface NoteLightProps {
  glowing: boolean;
  onClick: () => void;
}

export const NoteLight = ({ glowing, onClick }: NoteLightProps) => {
  return (
    <div 
      className={`w-8 h-8 rounded-full cursor-pointer
                ${glowing 
                  ? 'bg-red-500' 
                  : 'bg-red-900'
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
