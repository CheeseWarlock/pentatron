import { useEffect, useMemo, useState } from "react";
import { Synth } from "tone";

interface HoverableNoteProps {
  frequency: number;
}

/**
 * A note that plays on hover; for testing purposes.
 */
function HoverableNote({frequency}: HoverableNoteProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const synth = useMemo<Synth>(() => new Synth().toDestination(), []);

  useEffect(() => {
    return () => {
      synth.disconnect();
      setIsPlaying(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const play = () => {
    if (isPlaying) return;
    synth.triggerAttackRelease(frequency, "8n");
    setIsPlaying(true);
    synth.onsilence = () => {
      setIsPlaying(false);
    }
  }

  return <div className={`text-white text-sm rounded-full p-2 w-12 h-12 ${isPlaying ? 'bg-red-600' : 'bg-red-950'}`} onMouseOver={play}>{frequency.toFixed(1)}</div>;
}

export default HoverableNote;