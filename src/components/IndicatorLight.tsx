function IndicatorLight({ isOn }: { isOn: boolean }) {
  return <div style={ { boxShadow: isOn ? '0 0px 6px 3px var(--color-red-500)' : 'none' } } className={`w-4 h-4 rounded-full ${isOn ? 'bg-red-500' : 'bg-red-900'}`} />
}

export default IndicatorLight;
