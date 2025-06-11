interface NoteLightProps {
  glowing: boolean;
}

export const NoteLight = ({ glowing }: NoteLightProps) => {
  return (
    <div 
      className={`w-4 h-4 rounded-full
                ${glowing 
                  ? 'bg-red-500' 
                  : 'bg-red-900'
                }
                transition-colors
                ${glowing 
                  ? 'duration-100' 
                  : 'duration-500'
                }`}
    />
  );
};

export default NoteLight;
