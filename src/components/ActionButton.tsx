function ActionButton({ children, onClick, halfWidth, angle, style }: { children?: React.ReactNode, onClick?: () => void, halfWidth?: boolean, angle?: number | null, style?: React.CSSProperties }) {
  return <button
    className={`text-black px-4 py-2 rounded-sm h-8 ${halfWidth ? 'w-8' : 'w-16'}
    cursor-pointer ${angle != null ? `bg-linear-${angle}` : 'bg-linear-to-b'} from-neutral-300 to-neutral-400 transition-all duration-100
    relative active:translate-y-0.5 shadow-lg active:shadow-none active:inset-shadow-lg inset-shadow-black active:to-neutral-500 active:border-neutral-500`}
    onClick={onClick}
    style={style}
  >
    {children}
  </button>
}

export default ActionButton;