import FlatContainer from './FlatContainer';
import FlatVerticalSlider from './FlatVerticalSlider';
import { range } from '../utils';

const MIN_BPM = 30;
const MAX_BPM = 150;
const STEP_BPM = 30;

interface BPMSelectorProps {
  bpm: number;
  onSet: (bpm: number) => void;
}

export const BPMSelector = ({ bpm, onSet }: BPMSelectorProps) => {
  return (
    <FlatContainer title="BPM">
      <div className="flex flex-row items-center gap-4 h-50">
        <div className="h-full flex items-center gap-6">
          <FlatVerticalSlider value={bpm} min={MIN_BPM} max={MAX_BPM} onChange={onSet} />
          <div className="h-full flex flex-col justify-between pointer-events-none">
            {range(MAX_BPM, MIN_BPM, -STEP_BPM).map((tick) => (
              <div key={tick} className="flex items-center gap-1">
                <div className="w-2 h-px bg-gray-400" />
                <span className="text-sm">{tick}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FlatContainer>
  );
};

export default BPMSelector;
