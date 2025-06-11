import { useState } from "react";
import IndicatorLight from "./IndicatorLight";
import FlatContainer from "./FlatContainer";
import ActionButton from "./ActionButton";

function Evolver() {
  const [auto, setAuto] = useState(false);

  return <FlatContainer title="Evolver">
    <div className="flex flex-col items-center gap-2 justify-between w-full">
      <div className="flex flex-row items-center gap-2">
        <ActionButton onClick={() => setAuto(!auto)} />
        <IndicatorLight isOn={auto} />
        <span>Auto</span>
      </div>
      <div className="flex flex-row items-center gap-2 justify-between w-full">
        <ActionButton />
        <span>Trigger</span>
      </div>
    </div>
  </FlatContainer>
}

export default Evolver;