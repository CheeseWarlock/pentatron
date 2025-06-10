import PentatonicScale from "./PentatonicScale";
import Note from "./Note";

const PATTERN_LENGTH = 1;

function NoteGrid({scale}: {scale: PentatonicScale}) {
  const notes = scale.getNotes(250, 1000).reverse();
  const patternArray = Array(PATTERN_LENGTH).fill(0);
  return <div className="flex flex-col gap-2">
    {notes.map(frequency => {
      return <div className="flex flex-row gap-2">
        {patternArray.map((_v) => {
          return <Note frequency={frequency} />;
        })}
      </div>;
    })}
  </div>;
}

export default NoteGrid;