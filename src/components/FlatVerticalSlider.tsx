interface FlatVerticalSliderProps {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

function FlatVerticalSlider({ value, min, max, onChange }: FlatVerticalSliderProps) {
  return (<input
    type="range"
    value={value}
    min={min}
    max={max}
    onChange={(e) => {
      onChange?.(e.target.valueAsNumber);
    }}
    className="h-full mx-2 appearance-none bg-neutral-700 rounded-none
    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:h-4
    [&::-webkit-slider-thumb]:bg-gradient-to-b [&::-webkit-slider-thumb]:from-neutral-300 [&::-webkit-slider-thumb]:to-neutral-400 [&::-webkit-slider-thumb]:rounded-none [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:-ml-3 [&::-moz-range-thumb]:w-8
    [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-gradient-to-b [&::-moz-range-thumb]:from-neutral-300 [&::-moz-range-thumb]:to-neutral-400 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:rounded-none [&::-moz-range-thumb]:cursor-pointer
    [&::-webkit-slider-runnable-track]:bg-neutral-700 [&::-webkit-slider-runnable-track]:w-2 [&::-moz-range-track]:bg-neutral-700 [&::-moz-range-track]:w-2"
    style={{ writingMode: 'vertical-lr', direction: 'rtl' }}
  />);
}

export default FlatVerticalSlider;