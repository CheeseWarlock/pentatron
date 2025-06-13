import ActionButton from "./ActionButton";
import FlatContainer from "./FlatContainer";
import IndicatorLight from "./IndicatorLight";

interface PlayPauseButtonProps {
  playing: boolean;
  togglePlaying: () => void;
}

function PlayPauseButton({ playing, togglePlaying }: PlayPauseButtonProps) {
  return (
    <FlatContainer title="Play">
    <div className="flex flex-row items-center gap-2">
      <ActionButton onClick={togglePlaying} />
      <IndicatorLight isOn={playing} />
    </div>
  </FlatContainer>
  )
}

export default PlayPauseButton;