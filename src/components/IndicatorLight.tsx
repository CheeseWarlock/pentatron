/**
 * A small red light that indicates a boolean state.
 */
function IndicatorLight({ isOn, style }: { isOn: boolean, style?: React.CSSProperties }) {
  return <div
    style={ { boxShadow: isOn ? '0 0px 6px 3px var(--color-red-500)' : 'none', ...style } }
    className={`flex items-center justify-center w-4 h-4 transition-all duration-50 rounded-full ${isOn ? 'bg-red-500' : 'bg-red-900'}`}
  >
    <div className={`w-3 h-3 rounded-full ${isOn ? 'bg-red-200/20' : 'bg-red-950/20'}`} />
  </div>
}

export default IndicatorLight;
