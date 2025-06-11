import PentatonicScale from "../PentatonicScale";
import Note from "./HoverableNote";

function SimpleNotePlayer({scale}: {scale: PentatonicScale}) {
  const notes = scale.getNotes(250, 1000).reverse();
  return <div className="flex flex-col gap-2">
    {notes.map((frequency, index) => {
      return <Note key={`${frequency}-${index}`} frequency={frequency} />;
    })}
  </div>;
}

export default SimpleNotePlayer;