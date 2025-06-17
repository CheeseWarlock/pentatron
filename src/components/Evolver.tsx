import { useState } from "react";
import IndicatorLight from "./IndicatorLight";
import FlatContainer from "./FlatContainer";
import ActionButton from "./ActionButton";

interface EvolverProps {
  onAuto: (auto: boolean) => void;
  onTrigger: () => void;
  name: string;
}

/**
 * UI section for triggering automatic changes.
 */
function Evolver({ onAuto, onTrigger, name }: EvolverProps) {
  const [auto, setAuto] = useState(false);

  return <FlatContainer title={name}>
    <div className="flex flex-col items-center gap-2">
      <div className="flex flex-row items-center gap-2 justify-between w-full">
        <ActionButton onClick={() => {
          setAuto(!auto);
          onAuto(!auto);
        }} />
        <IndicatorLight isOn={auto} />
        <span>Auto</span>
      </div>
      <div className="flex flex-row items-center gap-2 justify-between w-full">
        <ActionButton onClick={() => {
          onTrigger();
        }} />
        <span>Trigger</span>
      </div>
    </div>
  </FlatContainer>
}

export default Evolver;