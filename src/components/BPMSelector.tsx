import FlatContainer from './FlatContainer';

interface BPMSelectorProps {
  bpm: number;
  onSet?: (bpm: number) => void;
}

export const BPMSelector = ({ bpm, onSet }: BPMSelectorProps) => {
  return (
    <FlatContainer title="BPM">
      <div className="flex flex-row items-center gap-4 w-40">
        <input
          type="range"
          value={bpm}
          min={30}
          max={150}
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

export default BPMSelector;
