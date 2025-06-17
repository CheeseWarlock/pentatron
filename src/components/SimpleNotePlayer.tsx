import PentatonicScale from "../PentatonicScale";
import Note from "./HoverableNote";

interface SimpleNotePlayerProps {
  scale: PentatonicScale;
}

/**
 * Displays the notes in the scale and plays them on hover.
 * Just for testing.
 */
function SimpleNotePlayer({scale}: SimpleNotePlayerProps) {
  const notes = scale.getNotes(250, 1000).reverse();
  return <div className="flex flex-col gap-2">
    {notes.map((frequency, index) => {
      return <Note key={`${frequency}-${index}`} frequency={frequency} />;
    })}
  </div>;
}

export default SimpleNotePlayer;