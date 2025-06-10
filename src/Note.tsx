import { useEffect, useMemo, useState } from "react";
import { Synth } from "tone";

class Blah {
  constructor() {
    console.log('Blah constructor');
  }
}

function Note({frequency}: {frequency: number}) {
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

  return <div className={`text-white text-2xl rounded-full p-2 ${isPlaying ? 'bg-red-600' : 'bg-red-950'}`} onMouseOver={play}>{frequency.toFixed(1)}hz</div>;
}

export default Note;