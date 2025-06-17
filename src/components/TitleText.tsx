/**
 * The title text for the Pentatron, with a cool font and gradient stripes.
 */
function TitleText() {
  return (
    <h1 className="audiowide-regular text-4xl text-white relative w-full">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <rect y="5" width="100" height="10" fill="#f97316" />
        <rect y="25" width="100" height="10" fill="#ea580c" />
        <rect y="45" width="100" height="10" fill="#c2410c" />
        <rect y="65" width="100" height="10" fill="#9a3412" />
        <rect y="85" width="100" height="10" fill="#7c2d12" />
      </svg>
      <div className="flex px-20">
        <span className="absolute z-10" style={{ WebkitTextStroke: "6px var(--color-neutral-800)" }}>Pentatron</span>
        <span className="relative z-11 text-neutral-200">Pentatron</span>
      </div>
    </h1>
  );
}

export default TitleText;