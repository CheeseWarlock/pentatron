import FlatContainer from './FlatContainer';
import FlatVerticalSlider from './FlatVerticalSlider';
import { range } from '../utils';

const MIN_ROOT = 256;
const MAX_ROOT = 512;
const STEP_ROOT = 64;

interface RootSelectorProps {
  root: number;
  onSet: (root: number) => void;
}

/**
 * Selector for the root frequency.
 */
export const RootSelector = ({ root, onSet }: RootSelectorProps) => {
  return (
    <FlatContainer title="Root Frq.">
      <div className="flex flex-row items-center gap-4 h-50">
        <div className="h-full flex items-center gap-6">
          <FlatVerticalSlider value={root} min={MIN_ROOT} max={MAX_ROOT} onChange={onSet} />
          <div className="h-full flex flex-col justify-between pointer-events-none">
            {range(MAX_ROOT, MIN_ROOT, -STEP_ROOT).map((tick) => (
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

export default RootSelector;
