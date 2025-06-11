import { useState } from 'react';
import FlatContainer from './FlatContainer';
import ActionButton from './ActionButton';

interface RootSelectorProps {
  onSet?: (root: number) => void;
}

export const RootSelector = ({ onSet }: RootSelectorProps) => {
  const [root, setRoot] = useState<number>(256);

  const handleSetClick = () => {
    onSet?.(root);
  };

  return (
    <FlatContainer title="Root Freq.">
      <div className="flex flex-row items-center gap-4">
        <input
          type="number"
          value={root}
          min={256}
          max={512}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (!isNaN(value)) {
              setRoot(value);
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

export default RootSelector;
