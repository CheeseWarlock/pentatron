function ActionButton({ children, onClick }: { children?: React.ReactNode, onClick?: () => void }) {
  return <button
    className="text-black px-4 py-2 rounded-sm h-8 w-16
    cursor-pointer bg-linear-to-b from-gray-300 to-gray-400 transition-all duration-100
    relative active:translate-y-0.5 shadow-lg active:shadow-none active:inset-shadow-lg inset-shadow-black active:border-gray-500"
    onClick={onClick}
  >
    {children}
  </button>
}

export default ActionButton;