import FlatContainer from './FlatContainer';

interface RootSelectorProps {
  root: number;
  onSet?: (root: number) => void;
}

/**
 * Selector for the root frequency.
 */
export const RootSelector = ({ root, onSet }: RootSelectorProps) => {
  return (
    <FlatContainer title="Root Freq.">
      <div className="flex flex-row items-center gap-4 w-40">
        <input
          type="range"
          value={root}
          min={256}
          max={512}
          onChange={(e) => {
            onSet?.(e.target.valueAsNumber);
          }}
          className="w-40 font-mono text-2xl p-0 bg-white border-2 border-gray-300 text-gray-900
                  rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
    </FlatContainer>
  );
};

export default RootSelector;
