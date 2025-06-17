interface FlatContainerProps {
  children: React.ReactNode;
  title: string;
}

/**
 * A container with a title and a border.
 */
function FlatContainer({ children, title }: FlatContainerProps) {
  return <div className="flex flex-col items-center gap-2 p-6 rounded-lg border-2 border-neutral-300 relative">
    <div className="text-xl absolute -top-2 left-2 bg-neutral-800 px-2 select-none h-3">
      <h2 className="text-neutral-300 relative top-1/2 -translate-y-1/2 ibm-plex-mono-semibold">{title}</h2>
    </div>
    {children}
  </div>
}

export default FlatContainer;