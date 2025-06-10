import { useState } from 'react';

interface RootSelectorProps {
  onSet?: (root: number) => void;
}

export const RootSelector = ({ onSet }: RootSelectorProps) => {
  const [root, setRoot] = useState<number>(256);

  const handleSetClick = () => {
    onSet?.(root);
  };

  const isValid = root >= 256 && root <= 512;

  return (
    <div className="flex items-center gap-4">
      <input
        type="number"
        value={root}
        onChange={(e) => {
          const value = parseInt(e.target.value);
          if (!isNaN(value)) {
            setRoot(value);
          }
        }}
        className="font-mono w-16 text-2xl p-0 bg-white border-2 border-gray-300 text-gray-900
                 rounded-lg focus:outline-none focus:border-blue-500"
      />
      <button
        onClick={handleSetClick}
        disabled={!isValid}
        className={`h-12 px-6 rounded-lg font-bold transition-colors duration-200
                  ${isValid 
                    ? 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
      >
        Set
      </button>
    </div>
  );
};

export default RootSelector;
