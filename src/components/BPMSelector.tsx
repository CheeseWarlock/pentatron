import { useState } from 'react';
import FlatContainer from './FlatContainer';
import ActionButton from './ActionButton';

interface BPMSelectorProps {
  onSet?: (root: number) => void;
}

export const BPMSelector = ({ onSet }: BPMSelectorProps) => {
  const [bpm, setBPM] = useState<number>(80);

  const handleSetClick = () => {
    onSet?.(bpm);
  };

  return (
    <FlatContainer title="BPM">
      <div className="flex flex-row items-center gap-4">
        <input
          type="number"
          value={bpm}
          min={30}
          max={150}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (!isNaN(value)) {
              setBPM(value);
            }
          }}
          className="font-mono w-16 text-2xl p-0 bg-white border-2 border-gray-300 text-gray-900
                  rounded-lg focus:outline-none focus:border-blue-500"
        />
        <ActionButton onClick={handleSetClick} />
      </div>
    </FlatContainer>
  );
};

export default BPMSelector;
