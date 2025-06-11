function FlatContainer({ children, title }: { children: React.ReactNode, title: string }) {
  return <div className="flex flex-col items-center gap-4 p-4 rounded-lg border-4 border-gray-300 relative">
    <div className="text-xl absolute -top-2 left-2 bg-gray-800 px-2 select-none h-3">
      <h2 className="text-white relative top-1/2 -translate-y-1/2">{title}</h2>
    </div>
    {children}
  </div>
}

export default FlatContainer;