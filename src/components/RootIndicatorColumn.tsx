import PentatonicScale from "../PentatonicScale";
import IndicatorLight from "./IndicatorLight";

function RootIndicatorColumn({ scale }: { scale: PentatonicScale }) {
  return (<><div className="self-end">Root</div>
    {Array.from({ length: 10 }, (_, i) => (
      <div key={`row-${i}`} className="flex items-center justify-center">
        <IndicatorLight isOn={scale.getRoots(250, 1000).includes(scale.getNotes(250, 1000)![10 - 1 - i]!)} />
      </div>
    ))}
  </>)
}

export default RootIndicatorColumn;