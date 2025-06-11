import { useState } from 'react';

interface BPMSelectorProps {
  onSet?: (root: number) => void;
}

export const BPMSelector = ({ onSet }: BPMSelectorProps) => {
  const [bpm, setBPM] = useState<number>(80);

  const handleSetClick = () => {
    onSet?.(bpm);
  };

  const isValid = bpm >= 30 && bpm <= 300;

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-gray-400 rounded-lg">
      <h2>BPM</h2>
      <div className="flex flex-row items-center gap-4">
        <input
          type="number"
          value={bpm}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (!isNaN(value)) {
              setBPM(value);
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
    </div>
  );
};

export default BPMSelector;
